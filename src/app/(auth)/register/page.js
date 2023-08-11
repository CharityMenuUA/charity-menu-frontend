"use client"

import style from '../auth.module.scss'
import {useForm} from "react-hook-form"
import Input from "@/app/components/input/Input"
import Link from "next/link"
import OtherSignInMethods from "@/app/(auth)/OtherSignInMethods"
import {auth} from "@/app/providers/firebase/app"
import Checkbox from "@/app/components/input/Checkbox"
import {setProfile} from "@/app/profile/actions"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {useState} from "react"
import Loader from "@/app/components/loader/Loader"
import {useConfigContext} from "@/app/providers/config/ConfigProvider"
import pages from "@/app/components/breadcrumbs/routing"

const RegisterPage = () => {
    const {updateUser} = useUserContext()
    const {config} = useConfigContext()
    const {handleSubmit, register, watch, formState: {errors}, setError} = useForm()
    const [loading, setLoading] = useState(false)

    const userAgreeToTerms = watch("user_agree_to_terms", false)

    const onSubmit = async (data) => {
        const {email, password, name} = data
        setLoading(true)
        await auth.createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                await userCredential.user.getIdToken().then(async (accessToken) => {
                    setProfile(accessToken, {name}).catch((err) => {
                        console.error({...err})
                        setLoading(false)
                    }).then(() => updateUser())
                })
            })
            .catch((err) => {
                setLoading(false)
                switch (err.code) {
                case "auth/email-already-in-use" : {
                    setError('email', {type: 'email-already-in-use', message: 'Користувач з цією поштою вже існує'})
                    break
                }
                case "auth/weak-password" : {
                    setError('password', {type: 'weak-password', message: 'Слабкий пароль'})
                    break
                }

                default: {
                    console.error({...err})
                    setError('common', {type: err.code, message: err.code})
                }
                }
            })
    }
    return (
        <div className={style.page}>
            <h1 className={style.h1}>
                Реєстрація
            </h1>
            <div className={style.wrap}>
                <div className={style.block}>
                    <div className={style.otherVariant}>
                        <div className={style.text}>
                            Реєстрація за допомогою
                        </div>
                        <OtherSignInMethods
                            setError={(err) => setError('common', {
                                type: err.code,
                                message: err.message || err.code
                            })}
                        />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                        <div className={style.text}>
                            Або з Email і Паролем
                        </div>
                        <Input name={"name"} register={register} errors={errors} label="Ім'я" required/>
                        <Input name={"email"} register={register} errors={errors} label="Email" type="email"
                               required
                        />
                        <Input name={"password"} register={register} errors={errors} label="Пароль" type="password"
                               required
                               pattern={{
                                   value: new RegExp(config?.password?.regex),
                                   message: config?.password?.warnLabel,
                               }}
                        />
                        <Checkbox name={"user_agree_to_terms"} register={register} errors={errors} required>
                            Погоджуюсь з умовами <a target="_blank" href={`${pages.policy.href}#offer`}>Оферти</a> та <a target="_blank"
                            href={`${pages.policy.href}#policy`}>Політики</a>
                        </Checkbox>
                        {errors.common && (
                            <div className={style.error}>
                                {errors.common.message}
                            </div>
                        )}
                        <button type={"submit"} className={style.submit} disabled={!userAgreeToTerms}>
                            {loading ? <Loader/> : 'Реєстрація'}
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

export default RegisterPage