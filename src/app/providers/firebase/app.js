"use client"

import {getApps, initializeApp} from "firebase/app"
import {
    browserLocalPersistence,
    getAuth,
    inMemoryPersistence,
    setPersistence,
} from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID,
}

const isBrowser = typeof window !== 'undefined'

if (isBrowser && !getApps().length) {
    initializeApp(firebaseConfig)
}

// `auth` is exported as an empty object during SSR so destructured imports
// don't crash server-rendered modules. All real calls go through callers that
// already guard for the browser context (all consumers are "use client").
export const auth = isBrowser ? getAuth() : {}

// Mobile Safari (private browsing, strict ITP, low storage) can block IndexedDB,
// which Firebase's default browserLocalPersistence depends on. When IndexedDB
// hangs, onAuthStateChanged never fires its initial callback and UserProvider
// sits in loading=true forever — perma-spinner on /profile, "Купити" button
// disabled. Falling back to in-memory persistence keeps the app usable; the
// trade-off is affected users get logged out when they close the tab.
if (isBrowser) {
    setPersistence(auth, browserLocalPersistence)
        .catch((err) => {
            console.warn('[firebase] LOCAL persistence unavailable, falling back to in-memory:', err)
            return setPersistence(auth, inMemoryPersistence)
        })
        .catch((err) => {
            console.error('[firebase] failed to set auth persistence:', err)
        })
}
