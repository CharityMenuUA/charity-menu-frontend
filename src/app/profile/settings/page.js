"use client"

import {useForm} from "react-hook-form"
import Input from "@/app/components/input/Input"
import style from "@/app/(auth)/auth.module.scss"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {updateProfile} from "@/app/profile/actions"


const SettingsPage = () => {
    const {user, profile, updateUser} = useUserContext()

    const {handleSubmit, register} = useForm({defaultValues: profile})

    const onSubmit = async (data) => {
        await updateProfile(user.accessToken, data).then(() => updateUser())
    }
    return (
        <div className={style.wrap}>
            <div className={style.block}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.text}>
                        Контактні дані
                    </div>
                    <Input name={"name"} register={register} label="Ім'я"/>
                    <Input name={"email"} register={register} label="Email" type="email" disabled/>
                    <Input name={"dateOfBirth"} register={register} label="Дата народження" type="date"/>
                    <Input name={"phoneNumber"} register={register} label="Телефон" type="tel"/>
                    <Input name={"city"} register={register} label="Місто"/>
                    <Input name={"novaPoshta"} register={register} label="Відділення Нової пошти"/>
                    <div className={style.text}>
                        Соціальні мережі
                    </div>
                    <Input name={"instagram"} register={register} label="Instagram"/>
                    <Input name={"facebook"} register={register} label="Facebook"/>
                    <Input name={"twitter"} register={register} label="Twitter"/>
                    <Input name={"tiktok"} register={register} label="Tiktok"/>
                    <button type={"submit"} className={style.submit}>
                        Відправити
                    </button>
                </form>
            </div>
        </div>
    )
}


export default SettingsPage