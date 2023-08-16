'use client'
import style from './orderItem.module.scss'
import {useMemo, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {useConfigContext} from "@/app/providers/config/ConfigProvider"
import PropTypes from "prop-types"
import {setCompleted} from "@/app/profile/actions"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import pages from "@/app/components/breadcrumbs/routing"

const OrderItem = (props) => {
    const {order, ordered, loadData} = props
    const {user} = useUserContext()
    const {config} = useConfigContext()
    const [isOpen, setIsOpen] = useState(false)
    const deliveryFields = useMemo(() => config.deliveryFields.find((e) => e.deliveryType === order.deliveryType), [config.deliveryFields, order.deliveryType])

    const onSetCompleted = async () => {
        await setCompleted(user.accessToken, order.id)
        await loadData()
    }

    return (
        <div className={style.order}>
            <div className={style.title} onClick={() => setIsOpen(!isOpen)}>
                <div>
                    {order.menuTitle}
                </div>
                {isOpen ? (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M30 20L10 20" stroke="black"/>
                    </svg>
                ) : (
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M20.0001 10L20.0001 30" stroke="black"/>
                        <path d="M30 20L10 20" stroke="black"/>
                    </svg>
                )}
            </div>
            {isOpen && (
                <div className={style.content}>
                    <div>
                        <div className={style.label}>
                            Ціна
                        </div>
                        <div className={style.amount}>
                            ₴{order.amount}
                        </div>
                    </div>
                    {!ordered && (
                        <div>
                            <div className={style.label}>
                                Автор
                            </div>
                            <Link href={`${pages.authors.href}/${order.chefId}`} className={style.chef}>
                                <div className={style.photo}>
                                    <Image
                                        alt={order.chefName || ''}
                                        src={order.chefPhoto}
                                        fill
                                        sizes="170px"
                                        quality={100}
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className={style.text}>
                                    {order.chefName || `${order.chefFirstName} ${order.chefLastName}`}
                                </div>
                            </Link>
                        </div>
                    )}
                    {deliveryFields.fields.map(({field, label}, key) => (
                        <div key={key}>
                            <div className={style.label}>
                                {label}
                            </div>
                            <div className={style.text}>
                                {order.deliveryDetails[field] || '-'}
                            </div>
                        </div>
                    ))}
                    <div>
                        <div className={style.label}>
                            Коментар
                        </div>
                        <div className={style.text}>
                            {order.comment || '-'}
                        </div>
                    </div>

                    {!ordered ? (
                        <Link href={`${pages.authors.href}/${order.chefId}/${order.menuItemId}`} className={style.button}>
                            Сторінка пропозиції
                        </Link>
                    ) : (
                        <button type={'button'} onClick={onSetCompleted} className={style.buttonBlack}>
                            Позначити як виконане
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

OrderItem.propTypes = {
    ordered: PropTypes.bool,
    loadData: PropTypes.func,
}
export default OrderItem