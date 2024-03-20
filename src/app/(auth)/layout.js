'use client'

import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect} from "react"

const LoginLayout = (props) => {
    const {children} = props
    const {user, profile} = useUserContext()
    const router = useRouter()

    useEffect(() => {
        const search = new URLSearchParams(window.location.search)
        const next = search.get('next') || '/profile'
        if (user && !user?.emailVerified) {
            router.push(`/register-email-confirm?next=${next.toString()}`)
        } else if (user && !profile) {
            router.push(`/register-complete?next=${next.toString()}`)
        } else if (user && profile) {
            router.push(next)
        }
    }, [profile, router, user])

    return (
        <>
            {children}
        </>
    )
}

export default LoginLayout
