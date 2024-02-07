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
import pages from "@/app/components/breadcrumbs/routing"
import {useRouter} from "next/navigation"

const ProfileMenuCreatePage = (props) => {
    const {params: {menuId}} = props
    const router = useRouter()
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
    const [menuData, setMenuData] = useState()

    useEffect(() => {
        getMenuItem(menuId).then((data) => {
            setLoading(false)

            Object.keys(data).forEach((key) => {
                setValue(key, data[key])
            })
            setMenuData(data)
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
            }, menuId).then(() => {
                router.push(pages.profile_menu.href)
            }).catch(() => {
                setLoading(false)
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

    const onChangeTotalLimit = (e) => {
        if (menuData?.totalLimit && menuData?.availableTotal) {
            const used = menuData.totalLimit - menuData.availableTotal
            if (e.target.value <= used) {
                setError('totalLimit', {message: `Число не може бути меньше ніж вже використано (${used})`})
            } else {
                clearErrors('totalLimit')
            }
        }
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
                           errors={errors} onChange={onChangeTotalLimit}
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
                    <br/>
                    <br/>
                    <div className={style.text}>
                        Зміни будуть відправлено на модерацію. <br/>
                        Після перевірки пропозиція буде опублікована.
                    </div>

                    <button type={"submit"} className={style.submit} disabled={loading}>
                        {loading ? <Loader/> : "Зберегти"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProfileMenuCreatePage
