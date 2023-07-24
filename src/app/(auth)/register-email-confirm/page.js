"use client"

import style from '../auth.module.scss'
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {auth} from "@/app/providers/firebase/app"
import {sendEmailVerification} from "firebase/auth"
import {useEffect, useState} from "react"

const RegisterEmailConfirmPage = () => {
    const [isSend, setIsSend] = useState(false)
    const [time, setTime] = useState(0)
    const {user, updateUser} = useUserContext()
    const minutes = 5
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
        sendEmailVerification(auth.currentUser)
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
                </div>
                <div className={style.block}>
                    {isSend && (
                        <div className={style.text}>
                            Повторна відправка буде доступна через 5 хвилин
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RegisterEmailConfirmPage