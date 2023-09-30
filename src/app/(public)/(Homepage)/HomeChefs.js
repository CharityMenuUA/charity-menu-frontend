"use client"
import style from './homepage.module.scss'
import ChefItem from "@/app/components/chef-item/ChefItem"


const HomeChefs = (props) => {
    const {chefs} = props
    return (
        <div className={style.chefList} itemScope itemType="https://schema.org/ItemList">
            {chefs.map((chef) => (
                <ChefItem key={chef.id} {...chef}/>
            ))}
        </div>
    )
}
export default HomeChefs
