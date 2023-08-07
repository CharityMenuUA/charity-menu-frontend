'use client'

import style from './profile.module.scss'
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {usePathname, useRouter} from "next/navigation"
import {auth} from "@/app/providers/firebase/app"
import {useEffect} from "react"
import Link from "next/link"
import Loader from "@/app/components/loader/Loader"

const ProfileLayout = (props) => {
    const {children} = props
    const {user, profile, loading} = useUserContext()
    const router = useRouter()
    const pathname = usePathname()
    const signOutClick = async () => {
        await auth.signOut()
    }

    useEffect(() => {
        if (!loading && !user) {
            router.push(`/login?next=${pathname}`)
        } else if (!loading && (user && !profile)) {
            router.push(`/register-complete?${next.toString()}`)
        }
    }, [loading, pathname, profile, router, user])

    if (loading) return (
        <>
            <h1 className={style.h1}>Мiй профіль</h1>
            <div className={style.layout}>
                <div className={style.loader}>
                    <Loader/>
                </div>
            </div>
        </>
    )


    if (!user) return (
        <>
            <h1 className={style.h1}>Мiй профіль</h1>
            <div className={style.layout}>
                <div className={style.loader}>
                    <Loader/>
                </div>
            </div>
        </>
    )

    return (
        <>
            <h1 className={style.h1}>Мiй профіль</h1>
            <div className={style.layout}>
                <div className={style.menu}>
                    <Link href={'/profile'} className={`${style.link} ${pathname === "/profile" ? style.active : ""}`}>
                        Що я замовляв
                    </Link>
                    {profile?.chef && (
                        <Link href={'/profile/ordered'}
                              className={`${style.link} ${pathname === "/profile/ordered" ? style.active : ""}`}>
                            Замовили в мене
                        </Link>
                    )}
                    <Link
                        href={'/profile/settings'}
                        className={`${style.link} ${pathname === "/profile/settings" ? style.active : ""}`}
                    >
                        Контактні дані
                    </Link>
                    <div onClick={signOutClick} className={style.link}>
                        Вийти
                    </div>
                </div>
                <div className={style.content}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default ProfileLayout