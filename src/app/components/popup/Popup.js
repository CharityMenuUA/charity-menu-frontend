'use client'


import {useEffect, useRef} from "react"
import PropTypes from "prop-types"
import style from "@/app/components/by-popup/style.module.scss"

const Popup = (props) => {
    const {onClose, children} = props
    const closeRef = useRef(null)

    useEffect(() => {
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        closeRef.current?.focus()

        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [onClose])

    return (
        <div className={style.popupWrap} role="dialog" aria-modal="true">
            <div className={style.popupMask} onClick={onClose}/>
            <div className={style.popup}>
                <button
                    ref={closeRef}
                    type={'button'}
                    className={style.close}
                    onClick={onClose}
                    aria-label="Закрити"
                >
                    <svg viewBox="0 0 40 40" aria-hidden="true">
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
