"use client"

import style from '../auth.module.scss'
import {useForm} from "react-hook-form"
import Input from "@/app/components/input/Input"
import Link from "next/link"

const NewPasswordPage = () => {
    const {handleSubmit, register} = useForm()
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
                        <Input name={"password"} register={register} label="Новий пароль" type="password"/>
                        <Input name={"repeat_password"} register={register} label="Повторiть новий пароль"
                               type="password"/>
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