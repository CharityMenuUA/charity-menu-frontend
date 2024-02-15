"use client"

import style from "@/app/components/popular-menu-items/popularMenuItems.module.scss"
import MenuItem from "@/app/components/menu-item/MenuItem"

const MenuItems = (props) => {
    const {menuItems} = props
    return (
        <div className={style.content}>
            {menuItems.map(({menuItem, chef}, key) => (
                <MenuItem position={key + 1} key={menuItem.id} min {...menuItem} chefNameAlt={chef.name} chefPhoto={chef.photo}/>
            ))}
        </div>
    )
}

export default MenuItems
