"use client"

import {useForm} from "react-hook-form"
import Input from "@/app/components/input/Input"
import style from "@/app/(auth)/auth.module.scss"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {setChef, setPhoto, updateProfile} from "@/app/profile/actions"
import {useEffect, useState} from "react"
import Loader from "@/app/components/loader/Loader"
import ImageUpload from "@/app/components/input/ImageUpload"
import Textarea from "@/app/components/input/Textarea"


const SettingsPage = () => {
    const {user, profile, updateUser} = useUserContext()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorChef, setErrorChef] = useState('')
    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
        getValues,
        watch,
        reset
    } = useForm({defaultValues: profile})

    useEffect(() => {
        reset((formValues) => ({
            ...formValues,
            ...profile,
        }))
    }, [reset, profile])

    const onSubmit = async (data) => {
        setLoading(true)
        await updateProfile(user?.accessToken, data).then(async () => {
            setLoading(false)
            setSuccess(true)
            await updateUser()
        }).catch(console.error)
    }

    const onSubmitPhoto = async (data) => {
        setLoading(true)
        await setPhoto(user?.accessToken, data).then(async () => {
            setLoading(false)
            setSuccess(true)
            await updateUser()
        }).catch(console.error)
    }

    const onClearPhoto = () => {
        setValue('photo', '')
    }

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [success])

    const onClickNewChef = async () => {
        const data = getValues()
        await updateProfile(user?.accessToken, data).then(async () => {
            setLoading(true)
            await setChef(user?.accessToken).then(async (e) => {
                if (e.errorMessage) {
                    setErrorChef(e.errorMessage)
                    setTimeout(() => setErrorChef(''), 5000)
                } else {
                    setErrorChef('')
                }
                await updateUser()
                setLoading(false)
            }).catch(async (e) => {
                console.error(e)
                await updateUser()
                setLoading(false)
            })
        })
    }

    const maxDate = new Date()

    maxDate.setYear(new Date().getFullYear() - 16)

    const photo = watch('photo')

    return (
        <div className={style.wrap}>
            <div className={style.block}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ImageUpload
                        name="photo"
                        title="Завантажте зображення профілю"
                        description={"JPG, PNG. Максимальний розмір 10 Мб."}
                        image={photo}
                        onSubmit={onSubmitPhoto}
                        onClear={onClearPhoto}
                    />
                    <div className={style.text}>
                        Дані профілю
                    </div>
                    <Input name={"name"} register={register} errors={errors} label="Ім'я" required/>
                    <Textarea name={"description"} register={register} errors={errors} label="Про себе"/>
                    <Input name={"email"} register={register} errors={errors} label="Email" type="email"
                           required
                           disabled
                    />
                    <Input name={"phoneNumber"} register={register} errors={errors} label="Телефон" type="tel"/>
                    <Input name={"city"} register={register} errors={errors} label="Місто"/>
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
            {!profile?.chef && (
                <div className={style.block} id="author">
                    <div className={style.text}>
                        Подайте заявку, щоб стати <b>автором</b> і додати власні <b>пропозиції</b>, які користувачі
                        сайту зможуть придбати за донат.
                    </div>
                    <div className={style.minitext}>
                        Необхідно заповнити дані профілю та хоча б одну соціальну мережу.
                    </div>
                    <button type={"button"} onClick={onClickNewChef} className={style.submit} disabled={loading}>
                        {loading ? <Loader/> : "Стати автором"}
                    </button>
                    {errorChef && (
                        <div className={style.errorPopup}>
                            {errorChef}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}


export default SettingsPage
