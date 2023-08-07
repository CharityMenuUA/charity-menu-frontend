'use client'
import style from './profile.module.scss'
import {getOrders} from "@/app/profile/actions"
import {useEffect, useState} from "react"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import OrderItem from "@/app/components/order-item/OrderItem"
import Empty from "@/app/profile/empty"
import Loader from "@/app/components/loader/Loader"

const ProfilePage = () => {
    const {user} = useUserContext()

    const [isLoading, setLoading] = useState(true)
    const [orders, setOrders] = useState({})

    useEffect(() => {
        if (user?.accessToken) getOrders(user.accessToken).then((orders) => {
            if (orders) {
                setOrders(orders)
            }
            setLoading(false)
        })
    }, [user.accessToken])

    if (isLoading) return <Loader/>

    if (!orders?.paid?.orders?.length && !orders?.completed?.orders?.length) {
        return (<Empty/>)
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
                            <OrderItem order={order} key={order.id}/>
                        ))}
                    </div>
                </>

            )}
            {!!orders?.completed?.orders?.length && (
                // {!!orders?.paid?.orders?.length && (
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

export default ProfilePage