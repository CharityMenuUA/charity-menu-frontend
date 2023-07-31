'use client'


import PropTypes from "prop-types"
import style from "@/app/components/by-popup/style.module.scss"

const Popup = (props) => {
    const {onClose, children} = props
    return (
        <div className={style.popupWrap}>
            <div className={style.popupMask} onClick={onClose}/>
            <div className={style.popup}>
                <button type={'button'} className={style.close} onClick={onClose}>
                    <svg viewBox="0 0 40 40">
                        <path d="M12.9287 12.929L27.0708 27.0711"/>
                        <path d="M12.9287 27.071L27.0708 12.9289"/>
                    </svg>
                </button>
                {children}
            </div>
        </div>
    )
}
Popup.propTypes = {
    onClose: PropTypes.func.isRequired,
}
export default Popup