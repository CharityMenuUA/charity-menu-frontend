"use client"

import style from '../auth.module.scss'
import {useForm} from "react-hook-form"
import Input from "@/app/components/input/Input"
import Link from "next/link"
import Checkbox from "@/app/components/input/Checkbox"
import {setProfile} from "@/app/profile/actions"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {useEffect} from "react"
import {useRouter, useSearchParams} from "next/navigation"
import pages from "@/app/components/breadcrumbs/routing"

const RegisterCompletePage = () => {
    const router = useRouter()
    const {user, loading, profile, updateUser} = useUserContext()
    const search = useSearchParams()
    const next = search.get('next') || '/profile'
    const {handleSubmit, register, watch, formState: {errors}} = useForm()

    const userAgreeToTerms = watch("user_agree_to_terms", false)

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push(`/login?${search.toString()}`)
            } else if ((user && profile) && next) {
                return router.push(next)
            }
        }
    }, [loading, next, profile, router, search, user])

    const onSubmit = (data) => {
        const {name} = data

        setProfile(user?.accessToken, {name}).catch((err) => {
            console.error({...err})
        }).then(() => {
            updateUser().catch(console.error)
        })
    }
    return (
        <div className={style.page}>
            <h1 className={style.h1}>
                Реєстрація
            </h1>
            <div className={style.wrap}>
                <div className={style.block}>
                    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                        <Input name={"name"} register={register} errors={errors} label="Ім'я" required/>
                        <Checkbox name={"user_agree_to_terms"} register={register} errors={errors} required>
                            Погоджуюсь з умовами <Link href={pages.policy.href}>Оферти та Політики</Link>
                        </Checkbox>
                        <button type={"submit"} className={style.submit} disabled={!userAgreeToTerms}>
                            Завершити реєстрацію
                        </button>
                    </form>
                </div>
                <div className={style.block}>
                    <div className={style.text}>
                        Вже є акаунт?
                    </div>
                    <Link href={pages.login.href} className={style.buttonWhite}>
                        Вхід
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterCompletePage