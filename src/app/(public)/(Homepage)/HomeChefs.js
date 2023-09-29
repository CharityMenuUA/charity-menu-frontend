"use client"
import style from './homepage.module.scss'
import {useSwitcherContext} from "@/app/components/switcher/Switcher"
import ChefItem from "@/app/components/chef-item/ChefItem"


const HomeChefs = (props) => {
    const {chefs} = props
    const {value} = useSwitcherContext()

    if (value) return false

    return (
        <div className={style.chefList} itemScope itemType="https://schema.org/ItemList">
            {chefs.map((chef) => (
                <ChefItem key={chef.id} {...chef}/>
            ))}
        </div>
    )
}
export default HomeChefs
