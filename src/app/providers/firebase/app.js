"use client"

import firebase from "firebase/app"
import "firebase/auth"

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

if (isBrowser && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = isBrowser ? firebase.auth() : {}

// Mobile Safari (private browsing, strict ITP, low storage) can block IndexedDB,
// which Firebase v8's default LOCAL persistence depends on. When IndexedDB hangs,
// onAuthStateChanged never fires its initial callback and the app sits in
// loading=true forever — perma-spinner on /profile, "Купити" button disabled
// everywhere. Falling back to in-memory NONE persistence keeps the app usable;
// the trade-off is affected users get logged out when they close the tab.
if (isBrowser && typeof auth.setPersistence === 'function') {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .catch((err) => {
            console.warn('[firebase] LOCAL persistence unavailable, falling back to NONE:', err)
            return auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
        })
        .catch((err) => {
            console.error('[firebase] failed to set auth persistence:', err)
        })
}
