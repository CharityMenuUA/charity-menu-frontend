import Chefs from "./Chefs"
import Menu from "./Menu"
import {getChef, getMenu} from "@/app/(public)/chefs/(chefs-and-menu)/actions"

const ChefsPage = async () => {
    const chefs = await getChef({})
    const menu = await getMenu({})

    return (
        <>
            <Chefs data={chefs}/>
            <Menu data={menu}/>
        </>
    )
}
export default ChefsPage