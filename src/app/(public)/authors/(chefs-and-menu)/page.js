import Chefs from "./Chefs"
import {getChef} from "@/app/(public)/authors/(chefs-and-menu)/actions"
import {chefsSortValues} from "@/app/(public)/authors/(chefs-and-menu)/sortValues"

export const revalidate = 0

const meta = {
    title: 'Всі автори - Ваші спільники у справі підтримки ЗСУ',
    description: 'Перегляньте список авторів, які приєдналися до нашої платформи та створили пропозиції, щоб допомогти ЗСУ.',
}
export const metadata = {
    ...meta,
    openGraph: {
        ...meta,
    }
}

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
