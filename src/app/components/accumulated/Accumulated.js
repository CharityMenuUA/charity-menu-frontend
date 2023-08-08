import style from './accumulated.module.scss'
import PropTypes from 'prop-types'
import Link from "next/link"
import pages from "@/app/components/breadcrumbs/routing"

const Accumulated = (props) => {
    const {amount} = props
    return (
        <Link href={pages.reporting.href} className={style.accumulated}>
            Зібрано <span>{amount || 0} грн</span>
        </Link>
    )
}

Accumulated.propTypes = {
    amount: PropTypes.number.isRequired
}
export default Accumulated