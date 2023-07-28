'use client'

import style from './input.module.scss'
import PropTypes from "prop-types"
import {useEffect, useMemo, useState} from "react"

const SelectSort = (props) => {
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
            <div className={`${style.select} ${isOpen ? style.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
               <span>
                    {active.name}
               </span>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"  >
                    <path d="M2 2L7.29289 7.29289C7.68342 7.68342 8.31658 7.68342 8.70711 7.29289L14 2"
                          stroke="url(#paint0_linear_103_307)" strokeWidth="3"/>
                    <defs>
                        <linearGradient id="paint0_linear_103_307" x1="0.983051" y1="8" x2="6.45638" y2="-2.09145"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F12711"/>
                            <stop offset="1" stopColor="#F5AF19"/>
                        </linearGradient>
                    </defs>
                </svg>
                {isOpen && (
                    <div className={style.options}>
                        {options.map(({value, name}) => (
                            <div
                                onClick={() => onChange({target: {value}})}
                                className={style.option}
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
SelectSort.propTypes = {
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
export default SelectSort