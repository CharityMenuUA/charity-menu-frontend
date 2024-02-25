import style from "@/app/(public)/(Homepage)/homepage.module.scss"
import HomeChefsAndOffers from "@/app/(public)/(Homepage)/HomeChefsAndOffers"
import PopularMenuItems from "@/app/components/popular-menu-items/PopularMenuItems"
import RandomMenuItem from "@/app/components/random-menu-item/RandomMenuItem"
import {getPopularMenuItem} from "@/app/components/actions"
import {chefsSortValues} from "@/app/(public)/authors/(chefs-and-menu)/sortValues"
import {getChef} from "@/app/(public)/authors/(chefs-and-menu)/actions"
import StepsSlider from "@/app/components/steps-slider/StepsSlider"
import HomeFaq from "@/app/(public)/(Homepage)/HomeFaq"
import HomeAttachments from "@/app/(public)/(Homepage)/HomeAttachments"
import HomeBecomeAuthorButton from "@/app/(public)/(Homepage)/HomeBecomeAuthorButton"

const HomePage = async () => {
    const [chefsSortBy, chefsDirection] = chefsSortValues[0].value.split('-')
    const {chefs} = await getChef({pageSize: 10, sortBy: chefsSortBy, direction: chefsDirection})
    const {menuItems: menuPopularItems} = await getPopularMenuItem()

    return (
        <>
            <HomeChefsAndOffers chefs={chefs}/>

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

export default HomePage
