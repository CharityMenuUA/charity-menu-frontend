"use client"
import style from './popularMenuItems.module.scss'
import MenuItems from "@/app/components/popular-menu-items/MenuItems"

const PopularMenuItems = ({menuItems = []}) => {
    return (
        <div className={style.popular}>
            <h2>Популярні пропозиції</h2>
            {!!menuItems.length && (
                <MenuItems min menuItems={menuItems}/>
            )}
        </div>
    )
}

export default PopularMenuItems
