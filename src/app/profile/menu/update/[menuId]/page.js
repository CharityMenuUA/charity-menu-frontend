"use client"

import {useForm} from "react-hook-form"
import {useEffect, useMemo, useState} from "react"
import style from "@/app/(auth)/auth.module.scss"
import Input from "@/app/components/input/Input"
import {useConfigContext} from "@/app/providers/config/ConfigProvider"
import Textarea from "@/app/components/input/Textarea"
import Checkbox from "@/app/components/input/Checkbox"
import Loader from "@/app/components/loader/Loader"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {getMenuItem, updateMenu} from "@/app/profile/actions"

const ProfileMenuCreatePage = (props) => {
    const {params: {menuId}} = props

    const {user, profile} = useUserContext()

    const {handleSubmit, register, formState: {errors}, getValues, setValue, watch, setError, clearErrors} = useForm({
        defaultValues: {
            deliveryTypes: [],
            chefId: profile.chefId,
            id: menuId
        }
    })

    const {config} = useConfigContext()

    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        getMenuItem(menuId).then((data) => {
            setLoading(false)
            const fields = Object.keys(getValues())
            Object.keys(data).forEach((key) => {
                if (data[key] && fields.includes(key)) setValue(key, data[key])
            })
        })
    }, [getValues, menuId, setValue, user.accessToken])

    const onSubmit = async (data) => {
        if (!deliveryTypes.length) {
            setError('deliveryTypes', {type: 'required', message: 'Повинен бути вибраний хочаб один тип доставки'})
        } else {
            setLoading(true)
            updateMenu(user.accessToken, {
                ...data,
                price: parseFloat(data.price),
                dailyLimit: parseFloat(data.dailyLimit),
                totalLimit: parseFloat(data.totalLimit),
            }).then(() => {
                setLoading(false)
                setSuccess(true)
            }).catch(() => {
                setLoading(false)
                setSuccess(false)
            })
        }
    }

    const deliveryTypes = watch("deliveryTypes")

    const deliveryFields = useMemo(() => {
        return [...config.deliveryFields].sort((a, b) => {
            if (a.label > b.label) return 1
            if (a.label < b.label) return -1
            else return 0
        })
    }, [config])

    const onChangeType = (field) => {
        if (deliveryTypes.includes(field.deliveryType)) {
            setValue('deliveryTypes', deliveryTypes.filter((type) => type !== field.deliveryType))
        } else {
            clearErrors('deliveryTypes')
            setValue('deliveryTypes', [...deliveryTypes, field.deliveryType])
        }
    }
    const numberPattern = {
        value: /\d/,
        message: 'Має бути цілим числом'
    }
    return (
        <div className={style.wrap}>
            <div className={style.block}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.text}>
                        Дані пропозиції
                    </div>
                    <Input name={"title"} register={register} errors={errors} label="Назва" required/>
                    <Textarea name={"description"} register={register} errors={errors} label="Опис" required/>
                    <Input name={"price"} type={"number"} pattern={numberPattern} register={register}
                           errors={errors} label="Ціна" required/>
                    <Input name={"dailyLimit"} type={"number"} pattern={numberPattern} register={register}
                           errors={errors}
                           label="Кількість на день" required/>
                    <Input name={"totalLimit"} type={"number"} pattern={numberPattern} register={register}
                           errors={errors}
                           label="Кількість всього" required/>
                    <div className={style.text}>
                        Тип доставки
                    </div>
                    {deliveryFields.map((field) => (
                        <div key={field.deliveryType}>
                            <Checkbox
                                required
                                name={field.deliveryType}
                                checked={deliveryTypes.includes(field.deliveryType)}
                                onChange={() => onChangeType(field)}
                            >
                                {field.label}
                            </Checkbox>
                        </div>
                    ))}
                    {errors.deliveryTypes && (
                        <div className={style.error}>
                            {errors.deliveryTypes.message}
                        </div>
                    )}
                    <button type={"submit"} className={style.submit} disabled={loading}>
                        {loading ? <Loader/> : "Зберегти"}
                    </button>

                    {success && (
                        <div className={style.success}>
                            Дані відправлено на модерацію та будуть опубліковані після перевірки
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ProfileMenuCreatePage
