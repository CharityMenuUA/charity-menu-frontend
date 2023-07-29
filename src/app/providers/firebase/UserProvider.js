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
    const reloadUser = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload()
        }
    }
    const updateUser = async (reload) => {
        if (reload) await reloadUser()
        if (auth.currentUser) {
            await auth.currentUser.getIdToken().then(async (accessToken) => {
                console.log(accessToken)
                const profile = await getProfile(accessToken).catch(console.error)
                if (profile.email) setProfile(profile)
                setUser({...auth.currentUser, accessToken})
                setLoading(false)
            })
        } else {
            setUser(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(() => updateUser())
    }, [])

    const value = useMemo(() => ({loading, user, profile, updateUser}), [loading, profile, user])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider