import Chefs from "./Chefs"
import {getChef} from "@/app/(public)/authors/(chefs-and-menu)/actions"
import {chefsSortValues} from "@/app/(public)/authors/(chefs-and-menu)/sortValues"

const ChefsPage = async () => {

    const [chefsSortBy, chefsDirection] = chefsSortValues[0].value.split('-')
    const chefs = await getChef({sortBy: chefsSortBy, direction: chefsDirection})

    return (
        <>
            <Chefs data={chefs}/>
        </>
    )
}
export default ChefsPage
