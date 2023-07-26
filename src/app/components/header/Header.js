'use client'

import style from './header.module.scss'
import HeaderMenu from './HeaderMenu'
import {useState} from 'react'
import SupportButton from './SupportButton'
import HeaderLogo from './HeaderLogo'
import {useConfigContext} from "@/app/providers/config/ConfigProvider"
import Link from "next/link"
import {useUserContext} from "@/app/providers/firebase/UserProvider"
import Image from "next/image"


const Header = () => {
    const [isOpenMenuState, setOpenMenuState] = useState(false)
    const {config} = useConfigContext()
    const {profile} = useUserContext()
    return (
        <header className={style.header}>
            <div className={style.left}>
                <button type={'button'} className={style.menu} onClick={() => setOpenMenuState(true)}>
                    <svg viewBox="0 0 40 40">
                        <path d="M10 15H30"/>
                        <path d="M10 20H30"/>
                        <path d="M10 25H30"/>
                    </svg>
                </button>

                <HeaderMenu isOpen={isOpenMenuState} setOpen={setOpenMenuState}/>
                {config?.supportLink && (
                    <SupportButton link={config.supportLink}/>
                )}
            </div>

            <HeaderLogo className={style.logo}/>

            <div className={style.right}>
                {profile ? (
                    <Link href={'/profile'} className={style.login}>
                        {profile?.photo ? (
                            <Image src={profile?.photo} alt={'Profile'} width={60} height={60}/>
                        ) : (
                            <svg viewBox="0 0 40 40">
                                <path
                                    d="M11 31.3335V31.3335C11 28.0198 13.6863 25.3335 17 25.3335H23C26.3137 25.3335 29 28.0198 29 31.3335V31.3335"/>
                                <circle cx="20" cy="15" r="7"/>
                            </svg>
                        )}
                    </Link>
                ) : (
                    <Link href={'/login'} className={style.login}>
                        <svg viewBox="0 0 40 40">
                            <path
                                d="M11 31.3335V31.3335C11 28.0198 13.6863 25.3335 17 25.3335H23C26.3137 25.3335 29 28.0198 29 31.3335V31.3335"/>
                            <circle cx="20" cy="15" r="7"/>
                        </svg>
                    </Link>
                )}


                <Link href={'/chefs?menu=1'} type={'button'} className={style.offers}>
                    Пропозиції
                </Link>
            </div>
        </header>
    )
}


export default Header
