"use client"

import style from '../auth.module.scss'
import Link from "next/link"
import Input from "@/app/components/input/Input"
import {useForm} from "react-hook-form"
import OtherSignInMethods from "@/app/(auth)/OtherSignInMethods"
import {auth} from "@/app/providers/firebase/app"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import validate from "@/app/components/input/validate"
import Loader from "@/app/components/loader/Loader"
import {useState} from "react"
import pages from "@/app/components/breadcrumbs/routing"


const LoginPage = () => {
    const {loading: userLoading} = useUserContext()
    const [loading, setLoading] = useState(false)
    const {handleSubmit, register, setError, formState: {errors}} = useForm()

    const onSubmit = (data) => {
        const {email, password} = data
        setLoading(true)
        auth.signInWithEmailAndPassword(email, password).catch((err) => {
            setLoading(false)

            switch (err.code) {
            case "auth/user-not-found" : {
                console.error({...err})
                setError('email', {type: 'user-not-found', message: 'Невірний email'})
                break
            }
            case "auth/wrong-password": {
                console.error({...err})
                setError('password', {type: 'auth/wrong-password', message: 'Невірно невірний'})
                break
            }
            default: {
                console.error({...err})
                setError('common', {type: err.code, message: err.code})
            }
            }
        })
    }

    if (userLoading) {
        return <Loader/>
    }
    return (<div className={style.page}>
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
                    <Input name={"email"} register={register} errors={errors} label="Email" type="email"
                           required
                    />
                    <Input name={"password"} register={register} errors={errors} label="Пароль" type="password"
                           required
                           pattern={{
                               value: validate.password,
                           }}
                    />
                    <Link href={pages["forgot-password"].href} className={style.forgot}>
                        Я забув пароль
                    </Link>
                    {errors.common && (
                        <div className={style.error}>
                            {errors.common.message}
                        </div>
                    )}
                    <button type={"submit"} className={style.submit} disabled={loading}>
                        {loading ? <Loader/> : 'Вхід'}
                    </button>
                </form>
            </div>
            <div className={style.block}>
                <div className={style.text}>
                    Ще немає акаунта?
                </div>
                <Link href={pages.register.href} className={style.buttonWhite}>
                    Реєстрація
                </Link>
            </div>
        </div>
    </div>)
}

export default LoginPage