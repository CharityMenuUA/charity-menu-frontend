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
    const reloadUser = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload()
        }
    }

    const updateUser = useCallback(async (reload) => {
        if (reload) await reloadUser()
        if (auth.currentUser) {
            await auth.currentUser.getIdToken(true).then(async (accessToken) => {
                const profile = await getProfile(accessToken).catch(console.error)
                if (profile?.email) setProfile(profile)
                setUser({...auth.currentUser, accessToken})
                setLoading(false)
            })
        } else {
            setUser(null)
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
        const unsubscribe = auth.onAuthStateChanged(updateUser)
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
