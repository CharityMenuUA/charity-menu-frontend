import style from "@/app/(public)/(Homepage)/homepage.module.scss"
import HomeChefsAndOffers from "@/app/(public)/(Homepage)/HomeChefsAndOffers"
import PopularMenuItems from "@/app/components/popular-menu-items/PopularMenuItems"
import RandomMenuItem from "@/app/components/random-menu-item/RandomMenuItem"
import {getPopularMenuItem} from "@/app/components/actions"
import {chefsSortValues, menuSortValues} from "@/app/(public)/chefs/(chefs-and-menu)/sortValues"
import {getChef, getMenu} from "@/app/(public)/chefs/(chefs-and-menu)/actions"


const HomePage = async () => {

    const [chefsSortBy, chefsDirection] = chefsSortValues[0].value.split('-')
    const [menuSortBy, menuDirection] = menuSortValues[0].value.split('-')
    const {chefs} = await getChef({pageSize: 10, sortBy: chefsSortBy, direction: chefsDirection})
    const {menuItems} = await getMenu({pageSize: 7, sortBy: menuSortBy, direction: menuDirection})
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
