"use client"

import style from '../auth.module.scss'
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {auth} from "@/app/providers/firebase/app"
import {sendEmailVerification} from "firebase/auth"
import {useState} from "react"

const RegisterEmailConfirmPage = () => {
    const [isSend, setIsSend] = useState(false)
    const {updateUser} = useUserContext()


    const onClick = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
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

                    {!isSend ? (
                        <>
                            <div className={style.text}>
                                Вам на пошту прийде лист
                            </div>

                            <div className={style.submit} onClick={onClick}>
                                Відправити листа
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={style.text}>
                                Вам надіслано листа для підтвердження пошти. Перевірте пошу.
                            </div>
                            <div className={style.submit} onClick={updateUser}>
                                Оновити статус
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RegisterEmailConfirmPage