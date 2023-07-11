import style from './accumulated.module.scss'
import PropTypes from 'prop-types'

const Accumulated = (props) => {
    const {amount} = props
    return (
        <div className={style.accumulated}>
            Зібрано <span>{amount || 0} грн</span>
        </div>
    )
}

Accumulated.propTypes = {
    amount: PropTypes.number.isRequired
}
export default Accumulated