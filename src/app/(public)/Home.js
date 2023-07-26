import style from './homepage.module.scss'
import HomeChefsAndOffers from '@/app/(public)/HomeChefsAndOffers'
import PopularMenuItems from "@/app/components/popular-menu-items/PopularMenuItems"
import RandomMenuItem from "@/app/components/random-menu-item/RandomMenuItem"
import {getPopularMenuItem} from "@/app/components/popular-menu-items/actions"
import {getChef, getMenu} from "@/app/(public)/actions"

const Home = async () => {
    const {chefs} = await getChef()
    const {menuItems} = await getMenu()
    const {menuItems: menuPopularItems} = await getPopularMenuItem()

    return (
        <div className={style.homepage}>
            <section className={style.head}>
                <h1>
                    Знаменитості склали меню і ти можеш зробити замовлення просто зараз.
                </h1>
                <div className={style.text}>
                    Благодійний проект, гроші з якого йдуть на допомогу Україні.
                </div>
            </section>
            <HomeChefsAndOffers chefs={chefs} menuItems={menuItems}/>
            <div className={style.popularRandom}>
                <PopularMenuItems menuItems={menuPopularItems}/>
                <RandomMenuItem/>
            </div>
        </div>
    )
}

export default Home