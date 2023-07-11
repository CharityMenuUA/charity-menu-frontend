'use client'

import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {auth} from '@/app/firebase/firebase/app'



export const UserContext = createContext({
    loading: true,
    user: null,
    updateUser: () => null,
})
export const useUserContext = () => useContext(UserContext)

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const updateUser = () => {
        if (auth.currentUser) {
            setUser(auth.currentUser)
        } else {
            setUser(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(updateUser)
    }, [])

    const value = useMemo(() => ({loading, user, updateUser}), [loading, user])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider