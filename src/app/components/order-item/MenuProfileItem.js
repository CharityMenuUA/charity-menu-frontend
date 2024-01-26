'use client'
import style from './orderItem.module.scss'
import {useState} from "react"
import Link from "next/link"
import {useConfigContext} from "@/app/providers/config/ConfigProvider"
import PropTypes from "prop-types"
import pages from "@/app/components/breadcrumbs/routing"
import {updateMenu} from "@/app/profile/actions"
import {useUserContext} from "@/app/providers/firebase/UserProvider"

const MenuProfileItem = (props) => {
    const {menuItem, update} = props
    const {user} = useUserContext()
    const {fields} = useConfigContext()
    const [isOpen, setIsOpen] = useState(false)

    const onChangeActivate = async () => {
        updateMenu(user.accessToken, {id: menuItem.id, active: !menuItem.active}).then(() => {
            update()
        })
    }

    return (
        <div className={`${style.order} ${!menuItem.active ? style.noactive : ''}`}>
            <div className={style.title} onClick={() => setIsOpen(!isOpen)}>
                <div>
                    {menuItem.title}
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
                            Опис
                        </div>
                        <div className={style.text}>
                            {menuItem.description || '-'}
                        </div>
                    </div>
                    <div>
                        <div className={style.label}>
                            Ціна
                        </div>
                        <div className={style.amount}>
                            ₴{menuItem.price || '-'}
                        </div>
                    </div>
                    <div>
                        <div className={style.label}>
                            Кількість на день
                        </div>
                        <div className={style.amount}>
                            {menuItem.dailyLimit || '-'}
                        </div>
                    </div>
                    <div>
                        <div className={style.label}>
                            Кількість всього
                        </div>
                        <div className={style.amount}>
                            {menuItem.totalLimit || '-'}
                        </div>
                    </div>
                    <div>
                        <div className={style.label}>
                            Тип доставки
                        </div>
                        <div className={style.amount}>
                            {menuItem.deliveryTypes.map((field) => fields[field].label).join(', ')}
                        </div>
                    </div>
                    <div className={style.buttonFlex}>
                        <Link href={`${pages.profile_menu_update.href}/${menuItem.id}`} className={style.button}>
                            Редагувати
                        </Link>

                        <button type={"button"} onClick={onChangeActivate} className={style.button}>
                            {menuItem.active ? "Призупинити" : "Активувати"}
                        </button>
                    </div>
                    <Link href={`${pages.authors.href}/${menuItem.chefId}/${menuItem.id}`}
                          className={style.buttonBlack}>
                        Сторінка пропозиції
                    </Link>
                </div>
            )}
        </div>
    )
}

MenuProfileItem.propTypes = {
    menuItem: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        dailyLimit: PropTypes.number,
        totalLimit: PropTypes.number,
        active: PropTypes.bool,
        deliveryTypes: PropTypes.arrayOf(PropTypes.string),
        update: PropTypes.func
    }),
}
export default MenuProfileItem
