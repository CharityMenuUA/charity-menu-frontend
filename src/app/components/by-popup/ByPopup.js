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


    const {handleSubmit, register, unregister} = useForm({
        shouldUnregister: true,
    })

    useEffect(() => {
        getMenuItem({menuId}).then((data) => {
            if (data) {
                setMenuItem(data)
            }
        })
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
        const {id: menuId, chefId} = menuItem
        const search = new URLSearchParams(window.location.search)
        search.set("success", "true")
        const body = {
            "deliveryType": deliveryType,
            redirectUrl: `${window.location.origin}${pathname}?${search.toString()}`,
            ...data
        }
        await createOrder(chefId, menuId, {body}, user?.accessToken).then((data) => {
            const {paymentUrl} = data
            if (paymentUrl) window.location.href = paymentUrl
        })
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
                                <Input value={profile[e.profileField]}
                                       register={register}
                                       name={`deliveryDetails.${e.field}`}
                                       label={e.label || e.field}
                                />
                            </div>
                        ))
                    )}
                    <Textarea name={'comment'} register={register} label={'КОМЕНТАР ДО ЗАМОВЛЕННЯ'}/>
                    <button type={"submit"} className={style.submit}>
                        продовжити
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