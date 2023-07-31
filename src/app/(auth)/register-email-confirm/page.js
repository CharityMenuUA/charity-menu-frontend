"use client"

import style from '../auth.module.scss'
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {auth} from "@/app/providers/firebase/app"
import {useEffect, useState} from "react"
import {useRouter, useSearchParams} from "next/navigation"

const RegisterEmailConfirmPage = () => {
    const [isSend, setIsSend] = useState(false)
    const [time, setTime] = useState(0)
    const {user, loading, updateUser} = useUserContext()
    const router = useRouter()
    const search = useSearchParams()
    const next = search.get('next') || '/profile'
    const minutes = 5


    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push(`/login?${search.toString()}`)
            } else if ((user && user?.emailVerified) && next) {
                return router.push(next)
            }
        }
    }, [loading, next, router, search, user])

    useEffect(() => {
        if (isSend) {
            const timer = setInterval(() => {
                if (time > 0) {
                    setTime(time - 3)
                    updateUser(true).catch(console.error)
                } else {
                    setIsSend(false)
                }
            }, 3000)
            return () => clearInterval(timer)
        }
    }, [isSend, time, updateUser])
    const onClick = () => {
        auth.currentUser.sendEmailVerification()
            .then(() => {
                setTime(60 * minutes)
                setIsSend(true)
            })
    }
    return (
        <div className={style.page}>
            <h1 className={style.h1}>
                Підтвердження пошти
            </h1>
            <div className={style.wrap}>
                <div className={style.block}>
                    <div className={style.text}>
                        На <b>{user?.email}</b> буде надіслано лист з посиланням, за яким треба перейти, щоб
                        підтвердити, що ви є власником цієї пошти
                    </div>

                    <button type={"button"} className={style.submit} onClick={onClick} disabled={isSend}>
                        Надіслати
                    </button>
                    {isSend && (
                        <div className={style.minitext}>
                            Повторна відправка буде доступна через 5 хвилин
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RegisterEmailConfirmPage