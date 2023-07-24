'use client'

import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect} from "react"

const LoginLayout = (props) => {
    const search = useSearchParams()
    const next = search.get('next')
    const {children} = props
    const {user, profile} = useUserContext()
    const router = useRouter()

    useEffect(() => {
        if (user && !profile) {
            if (next) {
                router.push(`/register-complete?${next.toString()}`)
            } else {
                router.push(`/register-complete`)
            }
        } else if (user && profile) {
            if (next) {
                router.push(next)
            } else {
                router.push('/profile')
            }
        }
    }, [next, profile, router, user])

    return (
        <>
            {children}
        </>
    )
}

export default LoginLayout