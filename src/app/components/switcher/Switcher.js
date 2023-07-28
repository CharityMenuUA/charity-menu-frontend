"use client"

import style from './style.module.scss'
import {createContext, useContext} from "react"
import {usePathname, useSearchParams, useRouter} from "next/navigation"

const SwitcherContext = createContext({
    value: false,
})

export const useSwitcherContext = () => useContext(SwitcherContext)

const SwitcherProvider = (props) => {
    const search = useSearchParams()
    const {children} = props
    const value = search.get('menu')

    return (
        <SwitcherContext.Provider value={{value: !!value}}>
            {children}
        </SwitcherContext.Provider>
    )
}
export default SwitcherProvider

export const Switcher = () => {
    const router = useRouter()
    const pathname = usePathname()
    const {value} = useSwitcherContext()
    const onClick = () => {
        const search = new URLSearchParams(location.search)
        if (value) {
            search.delete('menu')
            router.replace(`${pathname}?${search.toString()}`, {scroll: false})
        } else {
            search.set('menu', "1")
            router.replace(`${pathname}?${search.toString()}`, {scroll: false})
        }
    }
    return (
        <div className={`${style.switch}`}>
            <div onClick={onClick} className={`${style.text} ${!value ? style.active : ''}`}>
                Автори
            </div>
            <div onClick={onClick}>
                <div className={`${style.switcher} ${value ? style.active : ''}`}>
                    {!value ? (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"  >
                            <path
                                d="M10.667 31.9999V31.9999C10.667 28.318 13.6518 25.3333 17.3337 25.3333H22.667C26.3489 25.3333 29.3337 28.318 29.3337 31.9999V31.9999"
                                stroke="white" strokeWidth="1.33333"/>
                            <circle cx="19.9997" cy="14.6667" r="6.66667" stroke="white" strokeWidth="1.33333"/>
                        </svg>
                    ) : (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"  >
                            <path
                                d="M16.2202 12.7794L19.9997 16.4444L23.7791 12.7794C25.7593 10.8592 28.9067 10.8592 30.8869 12.7794C32.9551 14.785 32.9551 18.1037 30.8869 20.1093L19.9997 30.6666L9.11247 20.1093C7.04421 18.1037 7.04421 14.785 9.11247 12.7794C11.0927 10.8592 14.24 10.8592 16.2202 12.7794Z"
                                stroke="white" strokeWidth="1.33333"/>
                        </svg>
                    )}
                </div>
            </div>
            <div onClick={onClick} className={`${style.text} ${value ? style.active : ''}`}>
                Пропозиції
            </div>
        </div>
    )
}