import {getMenu} from "@/app/(public)/authors/(chefs-and-menu)/actions"
import {menuSortValues} from "@/app/(public)/authors/(chefs-and-menu)/sortValues"
import Menu from "@/app/(public)/authors/(chefs-and-menu)/Menu"

export const revalidate = 0

const meta = {
    title: 'Всі пропозиції - оберіть як саме Ви допоможете Україні',
    description: 'Ознайомтесь з усіма доступними пропозиціями, які ви можете отримати, задонативши на ЗСУ.',
}
export const metadata = {
    ...meta,
    openGraph: {
        ...meta,
    }
}

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
