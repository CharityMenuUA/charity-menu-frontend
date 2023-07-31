'use client'

import {usePathname, useRouter, useSearchParams} from "next/navigation"
import Popup from "@/app/components/popup/Popup"
import ReactPortal from "@/app/components/portal/ReactPortal"
import {useEffect, useState} from "react"
import style from "@/app/components/by-popup/style.module.scss"
import Link from "next/link"

const SuccessProvider = ({children}) => {
    const search = useSearchParams()
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    useEffect(() => {
        const success = search.get("success")
        if (success) setIsOpen(true)
    }, [search])

    const onClose = () => {
        setIsOpen(false)
        router.replace(`${pathname}`)
    }
    return (
        <>
            {children}
            <ReactPortal wrapperId={'success'}>
                {isOpen && (
                    <Popup onClose={onClose}>
                        <div className={style.block}>
                            <svg width="160" height="160" viewBox="0 0 160 160" fill="none"
                                 className={style.center_ico}>
                                <circle cx="79.9998" cy="80" r="79.5" fill="white"
                                        stroke="url(#paint0_linear_102_3441)"/>
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M132.359 60.0208L120.338 48L69.4262 98.9117L39.0206 68.5061L26.9998 80.5269L57.4053 110.933L69.4262 122.953L81.447 110.933L132.359 60.0208Z"
                                      fill="url(#paint1_linear_102_3441)"/>
                                <path
                                    d="M101.244 108.7L69.4243 76.8806C65.7144 73.1706 65.7144 67.1555 69.4243 63.4455L81.4452 51.4247C85.1551 47.7148 91.1702 47.7148 94.8802 51.4247L126.7 83.2445C130.41 86.9545 130.41 92.9696 126.7 96.6796L114.679 108.7C110.969 112.41 104.954 112.41 101.244 108.7Z"
                                    fill="white" stroke="url(#paint2_linear_102_3441)"/>
                                <path
                                    d="M94.632 74.1191L98.0623 77.2292L101.492 74.1191C103.092 72.6684 105.532 72.6684 107.132 74.1191C108.97 75.7853 108.97 78.6731 107.132 80.3392L98.0623 88.5625L88.9925 80.3392C87.1548 78.6731 87.1548 75.7853 88.9925 74.1191C90.5925 72.6684 93.032 72.6684 94.632 74.1191Z"
                                    fill="url(#paint3_linear_102_3441)"/>
                                <defs>
                                    <linearGradient id="paint0_linear_102_3441" x1="-13.5596" y1="160" x2="160"
                                                    y2="9.96276e-06" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F12711"/>
                                        <stop offset="1" stopColor="#F5AF19"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_102_3441" x1="18.071" y1="122.953" x2="96.9806"
                                                    y2="20.6988" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F12711"/>
                                        <stop offset="1" stopColor="#F5AF19"/>
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_102_3441" x1="138.02" y1="93.8571" x2="71.3332"
                                                    y2="109.628" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F12711"/>
                                        <stop offset="1" stopColor="#F5AF19"/>
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_102_3441" x1="83.4436" y1="88.5625" x2="101.12"
                                                    y2="64.598" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F12711"/>
                                        <stop offset="1" stopColor="#F5AF19"/>
                                    </linearGradient>
                                </defs>
                            </svg>

                            <h1 className={style.h1_inside}>
                                Все вийшло!
                            </h1>
                            <div className={style.text}>
                                Статус вашого замовлення доступний у профілі
                            </div>
                            <div className={style.buttons_success}>
                                <Link href={'/profile'} onClick={onClose} className={style.button_left}>
                                    В профiль
                                </Link>
                                <button type={'button'} onClick={onClose} className={style.button_right}>
                                    Закрити
                                </button>
                            </div>
                        </div>
                    </Popup>
                )}
            </ReactPortal>
        </>
    )
}

export default SuccessProvider