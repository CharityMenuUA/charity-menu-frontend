"use client"
import style from './homepage.module.scss'
import {useSwitcherContext} from "@/app/components/switcher/Switcher"
import MenuItem from "@/app/components/menu-item/MenuItem"


const HomeMenu = (props) => {
    const {menuItems} = props
    const {value} = useSwitcherContext()
    if (!value) return

    return (
        <div className={style.menuList} itemScope itemType="https://schema.org/ItemList">
            {menuItems.map(({menuItem, chef}) => (
                <MenuItem key={menuItem.id} {...menuItem} chefName={chef.name} chefPhoto={chef.photo}/>
            ))}
        </div>
    )
}
export default HomeMenu
