"use client"

import style from '../auth.module.scss'
import {useForm} from "react-hook-form"
import Input from "@/app/components/input/Input"
import Link from "next/link"
import validate from "@/app/components/input/validate"

const NewPasswordPage = () => {
    const {handleSubmit, register, formState: {errors}} = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className={style.page}>
            <h1 className={style.h1}>
                Новий пароль
            </h1>
            <div className={style.wrap}>
                <div className={style.block}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input required name={"password"} register={register} errors={errors} label="Новий пароль"
                               type="password"
                               pattern={{
                                   value: validate.password,
                               }}
                        />
                        <Input required name={"repeat_password"} register={register} errors={errors}
                               label="Повторiть новий пароль"
                               type="password"
                               pattern={{
                                   value: validate.password,
                               }}
                        />
                        <button type={"submit"} className={style.submit}>
                            ОНОВИТИ ПАРОЛЬ
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
        </div>
    )
}

export default NewPasswordPage