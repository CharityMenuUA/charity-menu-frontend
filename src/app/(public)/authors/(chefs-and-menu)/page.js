import Chefs from "./Chefs"
import Menu from "./Menu"
import {getChef, getMenu} from "@/app/(public)/authors/(chefs-and-menu)/actions"
import {chefsSortValues, menuSortValues} from "@/app/(public)/authors/(chefs-and-menu)/sortValues"

const ChefsPage = async () => {

    const [chefsSortBy, chefsDirection] = chefsSortValues[0].value.split('-')
    const [menuSortBy, menuDirection] = menuSortValues[0].value.split('-')
    const chefs = await getChef({sortBy: chefsSortBy, direction: chefsDirection})
    const menu = await getMenu({sortBy: menuSortBy, direction: menuDirection})

    return (
        <>
            <Chefs data={chefs}/>
            <Menu data={menu}/>
        </>
    )
}
export default ChefsPage