'use client'

import style from '../profile.module.scss'
import {getOrderedOrders} from "@/app/profile/actions"
import {useCallback, useEffect, useState} from "react"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import OrderItem from "@/app/components/order-item/OrderItem"
import Empty from "@/app/profile/empty"
import Loader from "@/app/components/loader/Loader"
import {notFound} from "next/navigation"


const OrderedPage = () => {
    const {user, profile, loading} = useUserContext()

    const [isLoading, setLoading] = useState(true)
    const [orders, setOrders] = useState({})

    const loadData = useCallback(() => {
        if (user?.accessToken) getOrderedOrders(user.accessToken).then((orders) => {
            if (orders) setOrders(orders)
            setLoading(false)
        })
    }, [user.accessToken])

    useEffect(() => {
        loadData()
    }, [loadData])

    if (isLoading || loading) return <Loader/>

    if (!profile.chefId) return notFound()

    if (!orders?.paid?.orders?.length && !orders?.completed?.orders?.length) {
        return (<Empty text={"Поки що замовлень немає"}/>)
    }

    return (
        <div>
            {!!orders?.paid?.orders?.length && (
                <>
                    <div className={style.subtitle}>
                        Оплачені
                    </div>
                    <div className={style.orders}>
                        {orders.paid.orders.map((order) => (
                            <OrderItem order={order} key={order.id} loadData={loadData} ordered={true}/>
                        ))}
                    </div>
                </>

            )}
            {!!orders?.completed?.orders?.length && (
                <>
                    <div className={style.subtitle}>
                        Виконані
                    </div>
                    <div className={style.orders}>
                        {orders?.completed?.orders.map((order) => (
                            <OrderItem order={order} key={order.id}/>
                        ))}
                    </div>
                </>

            )}
        </div>
    )
}

export default OrderedPage
