import Chefs from "./Chefs"
import Menu from "./Menu"
import {getChef, getMenu} from "@/app/(public)/chefs/actions"
import Title from "@/app/(public)/chefs/Title"


const ChefsPage = async () => {
    const chefs = await getChef({})
    const menu = await getMenu({})

    return (
        <div>
            <Title/>
            <Chefs data={chefs}/>
            <Menu data={menu}/>
        </div>
    )
}
export default ChefsPage