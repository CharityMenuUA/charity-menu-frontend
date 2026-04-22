import style from './homepage.module.scss'
import MenuItem from "@/app/components/menu-item/MenuItem"


const HomeMenu = (props) => {
    const {menuItems} = props
    return (
        <div className={style.menuList} itemScope itemType="https://schema.org/ItemList">
            {menuItems.map(({menuItem, chef}, key) => (
                <MenuItem position={key + 1} key={menuItem.id} {...menuItem} chefName={chef.name} chefPhoto={chef.photo}/>
            ))}
        </div>
    )
}
export default HomeMenu
