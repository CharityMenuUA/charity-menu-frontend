'use client'

import style from './input.module.scss'
import PropTypes from "prop-types"
import {useEffect, useMemo, useState} from "react"

const SelectForm = (props) => {
    const {placeholder, name, onChange, onBlur, disabled, value, required, options = []} = props
    const [isOpen, setIsOpen] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const active = useMemo(() => options.find((e) => e.value === value),[options, value])
    useEffect(() => {
        const close = () => {
            if (!isHover) setIsOpen(false)
        }
        document.addEventListener('click', close)
        return () => {
            document.removeEventListener('click', close)
        }
    }, [isHover])
    return (
        <div className={style.selectWrap} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <select
                value={value}
                id={name}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                className={style.selectInput}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
            >
                {options.map(({value, name}) => (
                    <option value={value} key={value}>{name}</option>
                ))}
            </select>
            <div className={`${style.selectForm} ${isOpen ? style.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
               <span>
                    {active?.name}
               </span>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M10 16L17.1716 23.1716C18.7337 24.7337 21.2663 24.7337 22.8284 23.1716L30 16" stroke="black" strokeWidth="2"/>
                </svg>

                {isOpen && (
                    <div className={style.optionsForm}>
                        {options.map(({value, name}) => (
                            <div
                                onClick={() => onChange({target: {value}})}
                                className={style.optionForm}
                                key={value}
                            >
                                {name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
SelectForm.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    register: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
    })),
}
export default SelectForm