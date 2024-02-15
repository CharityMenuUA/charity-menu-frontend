'use client'

import style from './profile.module.scss'
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {usePathname, useRouter} from "next/navigation"
import {auth} from "@/app/providers/firebase/app"
import {useEffect} from "react"
import Link from "next/link"
import Loader from "@/app/components/loader/Loader"
import pages from "@/app/components/breadcrumbs/routing"

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
            router.push(`/register-complete?next=${next.toString()}`)
        } else if (!loading && !user?.emailVerified) {
            router.push(`/register-email-confirm?next=${next.toString()}`)
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
                    {profile?.chef && (
                        <Link href={pages.profile_menu.href}
                              className={`${style.link} ${pathname === pages.profile_menu.href ? style.active : ""}`}>
                            Мої пропозиції
                        </Link>
                    )}
                    {profile?.chef && (
                        <Link href={pages.ordered.href}
                              className={`${style.link} ${pathname === pages.ordered.href ? style.active : ""}`}>
                            Замовили в мене
                        </Link>
                    )}
                    <div>
                        <br/>
                    </div>
                    <Link href={pages.profile.href}
                          className={`${style.link} ${pathname === pages.profile.href ? style.active : ""}`}>
                        Що я замовляв
                    </Link>
                    <Link
                        href={pages.settings.href}
                        className={`${style.link} ${pathname === pages.settings.href ? style.active : ""}`}
                    >
                        Редагувати профіль
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
