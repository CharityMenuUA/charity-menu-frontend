"use client"

import style from '../auth.module.scss'
import Link from "next/link"
import {useForm} from "react-hook-form"
import Input from "@/app/components/input/Input"
import {auth} from "@/app/providers/firebase/app"
import Loader from "@/app/components/loader/Loader"
import {useState} from "react"
import pages from "@/app/components/breadcrumbs/routing"

export const revalidate = 0

const ForgotPasswordPage = () => {
    const {handleSubmit, register, formState: {errors}, setError} = useForm()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const onSubmit = (data) => {
        const {email} = data
        setLoading(true)
        auth.sendPasswordResetEmail(email)
            .then(() => {
                setLoading(false)
                setSuccess(true)
            })
            .catch((err) => {
                setLoading(false)

                switch (err.code) {
                case "auth/user-not-found" : {
                    console.error({...err})
                    setError('email', {type: 'user-not-found', message: 'Невірний email'})
                    break
                }
                default: {
                    console.error({...err})
                    setError('common', {type: err.code, message: err.code})
                }
                }
            })
    }
    return (<div className={style.page}>
        <h1 className={style.h1}>
            Я забув пароль
        </h1>
        <div className={style.wrap}>
            <div className={style.block}>
                {success ? (
                    <div className={style.text}>
                        Перевірте свій Email, <br/> туди має прийти посилання на скидання пароля.
                    </div>
                ) : (
                    <>
                        <div className={style.text}>
                            Введіть свій Email, <br/> туди прийде посилання на скидання пароля.
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input name={"email"} register={register} errors={errors} label="Email" type="email"
                                   required/>
                            {errors.common && (
                                <div className={style.error}>
                                    {errors.common.message}
                                </div>
                            )}
                            <button type={"submit"} className={style.submit}>
                                {loading ? <Loader/> : 'Відправити'}
                            </button>
                        </form>
                    </>
                )}

            </div>
            <div className={style.block}>
                <div className={style.text}>
                    Пригадали пароль?
                </div>
                <Link href={pages.login.href} className={style.buttonWhite}>
                    Вхід
                </Link>
            </div>
        </div>
    </div>)
}

export default ForgotPasswordPage
