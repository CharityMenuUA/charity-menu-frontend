import style from './otherChefs.module.scss'
import ChefItem from '@/app/components/chef-item/ChefItem'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {getChefs} from "@/app/components/actions"
import pages from "@/app/components/breadcrumbs/routing"


const OtherChefs = async (props) => {
    const {chefs} = await getChefs()
    const {excludeId} = props
    const filterChefs = excludeId ? chefs.filter(((e) => parseFloat(e.id) !== parseFloat(excludeId))) : chefs
    return (
        <section className={style.chefs}>
            <h2 className="h2">Інші автори</h2>
            <div className={style.chefs_list}>
                {filterChefs.map((chef) => (
                    <ChefItem key={chef.id} {...chef} />
                ))}
            </div>
            <Link href={pages.authors.href} className={style.button}>
                більше авторів
            </Link>
        </section>
    )
}

OtherChefs.propTypes = {
    excludeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default OtherChefs