import style from './style.module.scss'
import {getList} from '@/helpers/dataProvider'
import MenuItem from '@/app/components/menu-item/MenuItem'
import Switcher from "@/app/components/switcher/Switcher"

const getMenu = async () => {
    try {
        return await getList(`/menu-items`).then(data => data.json())
    } catch {
        return {menuItems: []}
    }
}


const MenuPage = async () => {
    const {menuItems} = await getMenu()
    return (
        <div>
            <h1>Всі пропозиції</h1>
            <Switcher/>

            <section className={style.orders}>
                <div className={style.orders_list}>
                    {menuItems.map(({menuItem, chef}) => (
                        <MenuItem key={menuItem.id} {...menuItem} chefName={chef.name} chefPhoto={chef.photo} />
                    ))}
                </div>
            </section>
        </div>
    )
}
export default MenuPage