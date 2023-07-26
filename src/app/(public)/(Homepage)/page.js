import {getChef, getMenu} from "@/app/(public)/(Homepage)/actions"
import {getPopularMenuItem} from "@/app/components/popular-menu-items/actions"
import style from "@/app/(public)/(Homepage)/homepage.module.scss"
import HomeChefsAndOffers from "@/app/(public)/(Homepage)/HomeChefsAndOffers"
import PopularMenuItems from "@/app/components/popular-menu-items/PopularMenuItems"
import RandomMenuItem from "@/app/components/random-menu-item/RandomMenuItem"


const HomePage = async () => {
    const {chefs} = await getChef()
    const {menuItems} = await getMenu()
    const {menuItems: menuPopularItems} = await getPopularMenuItem()

    return (
        <>
            <HomeChefsAndOffers chefs={chefs} menuItems={menuItems}/>
            <div className={style.popularRandom}>
                <PopularMenuItems menuItems={menuPopularItems}/>
                <RandomMenuItem/>
            </div>
        </>
    )
}

export default HomePage
