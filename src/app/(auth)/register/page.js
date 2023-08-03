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
import validate from "@/app/components/input/validate"

const RegisterPage = () => {
    const {updateUser} = useUserContext()
    const {handleSubmit, register, watch, formState: {errors}} = useForm()

    const userAgreeToTerms = watch("user_agree_to_terms", false)

    const onSubmit = async (data) => {
        const {email, password, name} = data
        await auth.createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                await userCredential.user.getIdToken().then(async (accessToken) => {
                    setProfile(accessToken, {name}).catch((err) => {
                        console.error({...err})
                    }).then(() => updateUser())
                })

            })
            .catch((err) => {
                console.error({...err})
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
                        <OtherSignInMethods/>
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
                                   value: validate.password,
                               }}
                        />
                        <Checkbox name={"user_agree_to_terms"} register={register} errors={errors} required>
                            Ознайомлений з <Link href={'/'}>Політиками</Link> та <Link href={'/'}>Офертами</Link>
                        </Checkbox>
                        <button type={"submit"} className={style.submit} disabled={!userAgreeToTerms}>
                            Реєстрація
                        </button>
                    </form>
                </div>
                <div className={style.block}>
                    <div className={style.text}>
                        Вже є акаунт?
                    </div>
                    <Link href={'/login'} className={style.buttonWhite}>
                        Вхід
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage