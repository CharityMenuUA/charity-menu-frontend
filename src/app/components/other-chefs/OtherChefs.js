import style from "./otherChefs.module.scss";
import ChefItem from "@/app/components/chef-item/ChefItem";
import {getList} from "@/helpers/dataProvider";
import Link from "next/link";
import PropTypes from "prop-types";

const getChefs = async () => {
    try {
        return  await getList('/chefs', {
            params: {
                pageSize: 7,
            }
        }).then((e) => e.json())
    } catch {
        return {
            chefs: []
        }
    }
}
const OtherChefs = async (props) => {
    const {chefs} = await getChefs();
    const {excludeId} = props;
    const filterChefs = excludeId ? chefs.filter(((e) => parseFloat(e.id) !== parseFloat(excludeId))) : chefs;
    return (
        <section className={style.chefs}>
            <h2 className="h2">Інші артисти</h2>
            <div className={style.chefs_list}>
                {filterChefs.map((chef) => (
                    <ChefItem key={chef.id} {...chef}/>
                ))}
            </div>
            <Link href={'/chefs'} className={style.button}>
                більше Артистів
            </Link>
        </section>
    )
}

OtherChefs.propTypes = {
    excludeId: PropTypes.number
}
export default OtherChefs;