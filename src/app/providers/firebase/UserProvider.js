'use client'

import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {auth} from '@/app/providers/firebase/app'
import {getProfile} from "@/app/profile/actions"


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
    const updateUser = async () => {
        if (auth.currentUser) {
            const profile = await getProfile(auth.currentUser?.accessToken).catch(console.error)
            setUser(auth.currentUser)
            if (profile.email) {
                setProfile(profile)
            }
            setLoading(false)
        } else {
            setUser(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(updateUser)
    }, [])

    const value = useMemo(() => ({loading, user, profile, updateUser}), [loading, profile, user])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider