"use client"

import style from '../auth.module.scss'
import Link from "next/link"
import Input from "@/app/components/input/Input"
import {useForm} from "react-hook-form"
import OtherSignInMethods from "@/app/(auth)/OtherSignInMethods"
import {auth} from "@/app/providers/firebase/app"
import {
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth"

const LoginPage = () => {
    const {handleSubmit, register} = useForm()

    const onSubmit = (data) => {
        const {email, password, name} = data
        signInWithEmailAndPassword(auth, email, password).then(() => {
            updateProfile(auth.currentUser, {
                displayName: name
            }).catch((err) => {
                console.error({...err})
            })
        }).catch((err) => {
            switch (err.code) {
            case "auth/user-not-found" : {
                console.error('auth/user-not-found')
                break
            }
            case "auth/wrong-password": {
                console.error('auth/wrong-password')
                break
            }
            default: {
                console.error({...err})
            }
            }
        })
    }

    return (
        <div className={style.page}>
            <h1 className={style.h1}>
                Вхід
            </h1>
            <div className={style.wrap}>
                <div className={style.block}>
                    <div className={style.otherVariant}>
                        <div className={style.text}>
                            Вхід за допомогою
                        </div>
                        <OtherSignInMethods/>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                        <div className={style.text}>
                            Або з Email і Паролем
                        </div>
                        <Input name={"email"} register={register} label="Email" type="email" required/>
                        <Input name={"password"} register={register} label="Пароль" type="password" required/>
                        <Link href={"/forgot-password"} className={style.forgot}>
                            Я забув пароль
                        </Link>
                        <button type={"submit"} className={style.submit}>
                            Вхід
                        </button>
                    </form>
                </div>
                <div className={style.block}>
                    <div className={style.text}>
                        Ще немає акаунта?
                    </div>
                    <Link href={'/register'} className={style.buttonWhite}>
                        Реєстрація
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage