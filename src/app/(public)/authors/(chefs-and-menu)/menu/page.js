import {getMenu} from "@/app/(public)/authors/(chefs-and-menu)/actions"
import {menuSortValues} from "@/app/(public)/authors/(chefs-and-menu)/sortValues"
import Menu from "@/app/(public)/authors/(chefs-and-menu)/Menu"

const MenuPage = async () => {
    const [menuSortBy, menuDirection] = menuSortValues[0].value.split('-')
    const menu = await getMenu({sortBy: menuSortBy, direction: menuDirection})
    return (
        <>
            <Menu data={menu}/>
        </>
    )
}
export default MenuPage
