"use client"

import {useForm} from "react-hook-form"
import Input from "@/app/components/input/Input"
import style from "@/app/(auth)/auth.module.scss"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {updateProfile} from "@/app/profile/actions"


const SettingsPage = () => {
    const {user, profile, updateUser} = useUserContext()

    const {handleSubmit, register, formState: {errors}} = useForm({defaultValues: profile})

    const onSubmit = async (data) => {
        await updateProfile(user?.accessToken, data).then(async () => await updateUser()).catch(console.error)
    }

    return (
        <div className={style.wrap}>
            <div className={style.block}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.text}>
                        Контактні дані
                    </div>
                    <Input name={"name"} register={register} errors={errors} label="Ім'я" required/>
                    <Input name={"email"} register={register} errors={errors} label="Email" type="email"
                           required
                           disabled
                    />
                    <Input name={"dateOfBirth"} register={register} errors={errors} label="Дата народження"
                           type="date"/>
                    <Input name={"phoneNumber"} register={register} errors={errors} label="Телефон" type="tel"/>
                    <Input name={"city"} register={register} errors={errors} label="Місто"/>
                    <Input name={"novaPoshta"} register={register} errors={errors} label="Відділення Нової пошти"/>
                    <div className={style.text}>
                        Соціальні мережі
                    </div>
                    <Input name={"instagram"} register={register} errors={errors} label="Instagram"/>
                    <Input name={"facebook"} register={register} errors={errors} label="Facebook"/>
                    <Input name={"twitter"} register={register} errors={errors} label="Twitter"/>
                    <Input name={"tiktok"} register={register} errors={errors} label="Tiktok"/>
                    <button type={"submit"} className={style.submit}>
                        Відправити
                    </button>
                </form>
            </div>
        </div>
    )
}


export default SettingsPage