import style from './style.module.scss'
import {getList} from '@/helpers/dataProvider'
import MenuItem from '@/app/components/menu-item/MenuItem'

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
            <section className={style.orders}>
                <h1>Всі лоти</h1>
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