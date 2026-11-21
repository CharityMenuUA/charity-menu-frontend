'use client'

import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {useRouter} from 'next/navigation'
import {getSafeNext, withNext} from "@/helpers/safeNext"
import {useEffect} from "react"

const LoginLayout = (props) => {
    const {children} = props
    const {user, profile} = useUserContext()
    const router = useRouter()

    useEffect(() => {
        const next = getSafeNext()
        if (user && !user?.emailVerified) {
            router.push(withNext('/register-email-confirm', next))
        } else if (user && !profile) {
            router.push(withNext('/register-complete', next))
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
