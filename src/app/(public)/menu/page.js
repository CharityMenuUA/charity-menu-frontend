import style from './style.module.scss'
import {getList} from '@/helpers/dataProvider';
import MenuItem from "@/app/components/menu-item/MenuItem";

const getMenu = async () => {
    return getList(`/menu`).then(data => data.json()).catch(console.error)
}


const Page = async (props) => {
    const {params} = props;
    const menu = await getMenu(params);
    return (
        <div>
            <section className={style.orders}>
                <h1>Всі лоти</h1>
                <div className={style.orders_list}>
                    {menu.map(({menuItem, chef}) => (
                        <MenuItem key={menuItem.id} {...menuItem} chefName={chef.name} chefPhoto={chef.photo}/>
                    ))}
                </div>
            </section>
        </div>
    )
}
export default Page;