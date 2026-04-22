"use client"

import style from './style.module.scss'
import PropTypes from "prop-types"
import {useEffect, useMemo, useState} from "react"
import {createOrder, getMenuItem} from "@/app/components/actions"
import {useConfigContext} from "@/app/providers/config/ConfigProvider"
import SelectForm from "@/app/components/input/SelectForm"
import Input from "@/app/components/input/Input"
import {useForm} from "react-hook-form"
import Textarea from "@/app/components/input/Textarea"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import {usePathname} from "next/navigation"
import Popup from "@/app/components/popup/Popup"

const ByPopup = (props) => {
    const {menuId, onClose} = props
    const {user, profile} = useUserContext()
    const pathname = usePathname()
    const [menuItem, setMenuItem] = useState()
    const {config} = useConfigContext()
    const [deliveryType, setDeliveryType] = useState()


    const deliveryFields = useMemo(() => {
        return config?.deliveryFields.find(e => e?.deliveryType === deliveryType)
    }, [config?.deliveryFields, deliveryType])


    const {handleSubmit, register, unregister, formState: {errors}} = useForm({
        shouldUnregister: true,
    })

    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(null)

    useEffect(() => {
        getMenuItem({menuId})
            .then((data) => {
                if (data) {
                    setMenuItem(data)
                }
            })
            .catch(console.error)
    }, [menuId])

    useEffect(() => {
        setDeliveryType(menuItem?.deliveryTypes[0])
        unregister('deliveryDetails')
    }, [menuItem, unregister])


    const deliveryOptions = useMemo(() => config?.deliveryFields
        .filter(({deliveryType}) => menuItem?.deliveryTypes.includes(deliveryType))
        .map((e) => ({
            name: e.label || e.deliveryType,
            value: e.deliveryType,
        })), [config?.deliveryFields, menuItem?.deliveryTypes])


    const onSubmit = async (data) => {
        if (submitting) return
        const {id: menuId, chefId} = menuItem
        const search = new URLSearchParams(window.location.search)
        search.set("success", "true")
        const body = {
            "deliveryType": deliveryType,
            redirectUrl: `${window.location.origin}${pathname}?${search.toString()}`,
            ...data
        }
        setSubmitting(true)
        setSubmitError(null)
        try {
            const result = await createOrder(chefId, menuId, {body}, user?.accessToken)
            if (result?.paymentUrl) {
                window.location.href = result.paymentUrl
                return
            }
            setSubmitError("Не вдалося створити замовлення. Спробуйте ще раз.")
        } catch (err) {
            console.error(err)
            setSubmitError("Сервіс тимчасово недоступний. Спробуйте ще раз за кілька хвилин.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Popup onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.block}>
                    <h1 className={style.h1_inside}>
                        Оформлення замовлення
                    </h1>
                    <div className={style.text}>Тип доставки</div>
                    <SelectForm
                        name={"deliveryType"}
                        value={deliveryType}
                        onChange={(e) => setDeliveryType(e.target.value)}
                        options={deliveryOptions}/>
                </div>
                <div className={style.block}>
                    <div className={style.text}>
                        Дані для замовлення
                    </div>
                    {deliveryFields?.fields?.length && (
                        deliveryFields?.fields.map((e) => (
                            <div key={e.field}>
                                <Input
                                    value={profile[e.profileField]}
                                    register={register}
                                    errors={errors}
                                    name={`deliveryDetails.${e.field}`}
                                    label={e.label || e.field}
                                    required={e.required || false}
                                />
                            </div>
                        ))
                    )}
                    <Textarea name={'comment'} register={register} errors={errors} label={'КОМЕНТАР ДО ЗАМОВЛЕННЯ'}/>
                    {submitError && (
                        <div role="alert" style={{color: '#c00', margin: '12px 0', textAlign: 'center'}}>
                            {submitError}
                        </div>
                    )}
                    <button type={"submit"} className={style.submit} disabled={submitting}>
                        {submitting ? 'Обробка...' : 'продовжити'}
                    </button>
                </div>
            </form>
        </Popup>
    )
}
ByPopup.propTypes = {
    menuId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ByPopup
