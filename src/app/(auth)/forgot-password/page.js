"use client"

import style from '../auth.module.scss'
import Link from "next/link"
import {useForm} from "react-hook-form"
import Input from "@/app/components/input/Input"
import {auth} from "@/app/providers/firebase/app"
import {sendPasswordResetEmail} from "firebase/auth"

const ForgotPasswordPage = () => {
    const {handleSubmit, register} = useForm()
    const onSubmit = (data) => {
        const {email} = data
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((err) => {
                console.error({...err})
            })
    }
    return (<div className={style.page}>
        <h1 className={style.h1}>
            Я забув пароль
        </h1>
        <div className={style.wrap}>
            <div className={style.block}>
                <div className={style.text}>
                    Введіть свій Email, <br/> туди прийде посилання на скидання пароля.
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name={"email"} register={register} label="Email" type="email" required/>
                    <button type={"submit"} className={style.submit}>
                        Відправити
                    </button>
                </form>
            </div>
            <div className={style.block}>
                <div className={style.text}>
                    Пригадали пароль?
                </div>
                <Link href={'/login'} className={style.buttonWhite}>
                    Вхід
                </Link>
            </div>
        </div>
    </div>)
}

export default ForgotPasswordPage