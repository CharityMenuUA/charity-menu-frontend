"use client"

import {useForm} from "react-hook-form"
import Input from "@/app/components/input/Input"
import style from "@/app/(auth)/auth.module.scss"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {updateProfile} from "@/app/profile/actions"
import {useEffect, useState} from "react"
import Loader from "@/app/components/loader/Loader"
import ImageUpload from "@/app/components/input/ImageUpload"


const SettingsPage = () => {
    const {user, profile, updateUser} = useUserContext()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const {handleSubmit, register, formState: {errors}} = useForm({defaultValues: profile})

    const onSubmit = async (data) => {
        setLoading(true)
        await updateProfile(user?.accessToken, data).then(async () => {
            setLoading(false)
            setSuccess(true)
            await updateUser()
        }).catch(console.error)
    }

    const onSubmitPhoto = async () => {
        // setLoading(true)
        // await setPhoto(user?.accessToken, data).then(async () => {
        //     setLoading(false)
        //     setSuccess(true)
        //     await updateUser()
        // }).catch(console.error)
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [success])
    const maxDate = new Date()
    maxDate.setYear(new Date().getFullYear() - 16)
    return (
        <div className={style.wrap}>
            <div className={style.block}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ImageUpload name="photo" label="Photo" image={profile.photo} onSubmit={onSubmitPhoto}/>
                    <div className={style.text}>
                        Контактні дані
                    </div>
                    <Input name={"name"} register={register} errors={errors} label="Ім'я" required/>
                    <Input name={"email"} register={register} errors={errors} label="Email" type="email"
                           required
                           disabled
                    />
                    <Input name={"dateOfBirth"} max={maxDate.toLocaleDateString('fr-ca')} register={register}
                           errors={errors}
                           label="Дата народження"
                           type="date"/>
                    <div className={style.text}>
                        Соціальні мережі
                    </div>
                    <Input name={"instagram"} register={register} errors={errors} label="Instagram"/>
                    <Input name={"facebook"} register={register} errors={errors} label="Facebook"/>
                    <Input name={"twitter"} register={register} errors={errors} label="Twitter"/>
                    <Input name={"tiktok"} register={register} errors={errors} label="Tiktok"/>
                    <Input name={"youtube"} register={register} errors={errors} label="YouTube"/>
                    <div className={style.text}>
                        Дані Нової пошти
                    </div>
                    <Input name={"fullName"} register={register} errors={errors} label="ПІБ"/>
                    <Input name={"phoneNumber"} register={register} errors={errors} label="Телефон" type="tel"/>
                    <Input name={"city"} register={register} errors={errors} label="Місто"/>
                    <Input name={"novaPoshta"} register={register} errors={errors} label="Відділення Нової пошти"/>

                    <button type={"submit"} className={style.submit} disabled={loading}>
                        {loading ? <Loader/> : "Зберегти"}
                    </button>

                    {success && (
                        <div className={style.success}>
                            Дані збережено
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}


export default SettingsPage
