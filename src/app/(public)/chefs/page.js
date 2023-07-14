import style from './chef.module.scss'
import {getList} from '@/helpers/dataProvider'
import ChefItem from "@/app/components/chef-item/ChefItem"

const getChef = async () => {
    try {
        return await getList(`/chefs`).then(data => data.json())
    } catch {
        return {chefs: []}
    }
}

const ChefsPage = async (props) => {
    const {params} = props
    const {chefs} = await getChef(params)
    return (
        <div className={style.chefList}>
            {chefs.map((chef) => (
                <ChefItem  key={chef.id} {...chef}/>
            ))}
        </div>
    )
}
export default ChefsPage