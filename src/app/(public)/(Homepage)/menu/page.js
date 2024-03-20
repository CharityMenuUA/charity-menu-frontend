import style from "@/app/(public)/(Homepage)/homepage.module.scss"
import HomeChefsAndOffers from "@/app/(public)/(Homepage)/HomeChefsAndOffers"
import PopularMenuItems from "@/app/components/popular-menu-items/PopularMenuItems"
import RandomMenuItem from "@/app/components/random-menu-item/RandomMenuItem"
import {getPopularMenuItem} from "@/app/components/actions"
import {menuSortValues} from "@/app/(public)/authors/(chefs-and-menu)/sortValues"
import {getMenu} from "@/app/(public)/authors/(chefs-and-menu)/actions"
import StepsSlider from "@/app/components/steps-slider/StepsSlider"
import HomeFaq from "@/app/(public)/(Homepage)/HomeFaq"
import HomeBecomeAuthorButton from "@/app/(public)/(Homepage)/HomeBecomeAuthorButton"
import HomeAttachments from "@/app/(public)/(Homepage)/HomeAttachments"

export const revalidate = 10

const HomeWithMenuPage = async () => {
    const [menuSortBy, menuDirection] = menuSortValues[0].value.split('-')
    const {menuItems} = await getMenu({pageSize: 7, sortBy: menuSortBy, direction: menuDirection})
    const {menuItems: menuPopularItems} = await getPopularMenuItem()

    return (
        <>
            <HomeChefsAndOffers menuItems={menuItems}/>
            <StepsSlider/>
            <HomeAttachments/>
            <div className={style.popularRandom}>
                <PopularMenuItems menuItems={menuPopularItems}/>
                <RandomMenuItem/>
            </div>
            <HomeBecomeAuthorButton/>
            <HomeFaq/>
        </>
    )
}

export default HomeWithMenuPage
