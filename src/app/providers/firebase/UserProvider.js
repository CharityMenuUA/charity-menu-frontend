'use client'

import {createContext, startTransition, useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {onAuthStateChanged} from "firebase/auth"
import {auth} from '@/app/providers/firebase/app'
import {getProfile} from "@/app/profile/actions"
import {usePathname} from "next/navigation"

export const UserContext = createContext({
    loading: true,
    user: null,
    profile: null,
    updateUser: async () => null,
})
export const useUserContext = () => useContext(UserContext)

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()

    // forceRefresh=true bypasses the Firebase token cache; only pass it when the
    // caller knows the token payload changed (e.g. after a profile update that
    // changes custom claims). Default path reuses the cached token.
    // Auth-state updates are wrapped in startTransition so React treats them
    // as non-urgent — user input (taps, scroll) stays responsive while the
    // provider tree re-renders for a login/logout/token refresh.
    const updateUser = useCallback(async (forceRefresh = false) => {
        if (forceRefresh && auth.currentUser) {
            await auth.currentUser.reload()
        }
        if (auth.currentUser) {
            try {
                const accessToken = await auth.currentUser.getIdToken(forceRefresh === true)
                const profile = await getProfile(accessToken).catch(console.error)
                startTransition(() => {
                    if (profile?.email) setProfile(profile)
                    setUser({...auth.currentUser, accessToken})
                })
            } finally {
                setLoading(false)
            }
        } else {
            startTransition(() => {
                setUser(null)
                setProfile(null)
            })
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (auth?.currentUser) {
            auth.currentUser.getIdToken().then((accessToken) => {
                startTransition(() => {
                    setUser({...auth.currentUser, accessToken})
                })
            })
        }
    }, [pathname])

    useEffect(() => {
        let settled = false
        // Firebase calls the listener with the User object; drop it so updateUser's
        // default `forceRefresh=false` is preserved.
        const unsubscribe = onAuthStateChanged(auth, () => {
            settled = true
            updateUser()
        })
        // Safety net: if Firebase's auth state never resolves (mobile Safari
        // with IndexedDB blocked, or any other stuck state), don't leave the
        // app in loading=true forever. After 8 s of silence, treat the user as
        // signed-out. If Firebase eventually catches up, the listener above
        // will correct the state.
        const safetyTimer = setTimeout(() => {
            if (!settled) {
                console.warn('[UserProvider] auth state did not resolve within 8s; treating as signed-out')
                updateUser()
            }
        }, 8000)
        return () => {
            unsubscribe()
            clearTimeout(safetyTimer)
        }
    }, [updateUser])

    const value = useMemo(
        () => ({loading, user, profile, updateUser}),
        [loading, user, profile, updateUser],
    )

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider
