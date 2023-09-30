"use client"

import styles from './style.module.scss'
import {usePathname} from "next/navigation"
import Link from "next/link"

export const SwitcherLink = ({from, to}) => {
    const pathname = usePathname()
    const value = pathname === to
    return (
        <div className={`${styles.switch}`}>
            <Link href={from} className={`${styles.text} ${!value ? styles.active : ''}`}>
                Автори
            </Link>
            <Link href={value ? from : to}>
                <div className={`${styles.switcher} ${value ? styles.active : ''}`}>
                    {!value ? (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path
                                d="M10.667 31.9999V31.9999C10.667 28.318 13.6518 25.3333 17.3337 25.3333H22.667C26.3489 25.3333 29.3337 28.318 29.3337 31.9999V31.9999"
                                stroke="white" strokeWidth="1.33333"/>
                            <circle cx="19.9997" cy="14.6667" r="6.66667" stroke="white" strokeWidth="1.33333"/>
                        </svg>
                    ) : (
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path
                                d="M16.2202 12.7794L19.9997 16.4444L23.7791 12.7794C25.7593 10.8592 28.9067 10.8592 30.8869 12.7794C32.9551 14.785 32.9551 18.1037 30.8869 20.1093L19.9997 30.6666L9.11247 20.1093C7.04421 18.1037 7.04421 14.785 9.11247 12.7794C11.0927 10.8592 14.24 10.8592 16.2202 12.7794Z"
                                stroke="white" strokeWidth="1.33333"/>
                        </svg>
                    )}
                </div>
            </Link>
            <Link href={to} className={`${styles.text} ${value ? styles.active : ''}`}>
                Пропозиції
            </Link>
        </div>
    )
}
