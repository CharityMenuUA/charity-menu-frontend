'use client'

import {createContext, useCallback, useContext, useEffect, useState} from 'react'
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
    const updateUser = useCallback(async (forceRefresh = false) => {
        if (forceRefresh && auth.currentUser) {
            await auth.currentUser.reload()
        }
        if (auth.currentUser) {
            try {
                const accessToken = await auth.currentUser.getIdToken(forceRefresh === true)
                const profile = await getProfile(accessToken).catch(console.error)
                if (profile?.email) setProfile(profile)
                setUser({...auth.currentUser, accessToken})
            } finally {
                setLoading(false)
            }
        } else {
            setUser(null)
            setProfile(null)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (auth?.currentUser) {
            auth.currentUser.getIdToken().then((accessToken) => {
                setUser({...auth.currentUser, accessToken})
            })
        }
    }, [pathname])

    useEffect(() => {
        // Firebase calls the listener with the User object; drop it so updateUser's
        // default `forceRefresh=false` is preserved.
        const unsubscribe = auth.onAuthStateChanged(() => updateUser())
        return () => unsubscribe()
    }, [updateUser])

    const value = {loading, user, profile, updateUser}

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider
