'use client'

import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect} from "react"

const LoginLayout = (props) => {
    const search = useSearchParams()
    const next = search.get('next') || '/profile'
    const {children} = props
    const {user, profile} = useUserContext()
    const router = useRouter()

    useEffect(() => {
        if (user && !user?.emailVerified) {
            router.push(`/register-email-confirm?${next.toString()}`)
        } else if (user && !profile) {
            router.push(`/register-complete?${next.toString()}`)
        } else if (user && profile) {
            router.push(next)
        }
    }, [next, profile, router, user])

    return (
        <>
            {children}
        </>
    )
}

export default LoginLayout