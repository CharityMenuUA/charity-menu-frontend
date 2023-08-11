'use client'
import Link from 'next/link'
import style from './headerMenu.module.scss'
import ReactPortal from '../portal/ReactPortal'
import SupportButton from './SupportButton'
import HeaderLogo from './HeaderLogo'
import {usePathname} from 'next/navigation'
import {useEffect} from 'react'
import {useConfigContext} from "@/app/providers/config/ConfigProvider"
import pages from "@/app/components/breadcrumbs/routing"


const HeaderMenu = (props) => {

    const {config} = useConfigContext()
    const {contacts: {telegram, instagram, twitter, facebook}} = config

    const pathname = usePathname()

    const {isOpen, setOpen} = props

    useEffect(() => {
        setOpen(false)
    }, [pathname, setOpen])


    const handleCloseMenu = () => setOpen(false)

    return (
        <ReactPortal wrapperId={'menu'}>
            <div className={`${style.headerMenu} ${isOpen ? style.active : ''}`}>
                <div className={style.mask} onClick={handleCloseMenu}/>
                <div className={style.content}>
                    <button type={'button'} className={style.close} onClick={handleCloseMenu}>
                        <svg viewBox="0 0 40 40">
                            <path d="M12.9287 12.929L27.0708 27.0711"/>
                            <path d="M12.9287 27.071L27.0708 12.9289"/>
                        </svg>
                    </button>
                    <div className={style.container}>
                        <HeaderLogo className={style.logo}/>
                        <div className={style.text}>
                            Платформа, на якій ти змжеш отримати приємні емоції, а Україна реальну допомогу.
                        </div>
                        {config?.supportLink && (
                            <SupportButton link={config.supportLink}/>
                        )}
                        <div className={style.navigate}>
                            <Link href={pages.team.href} className={style.link}>
                                Команда
                            </Link>
                            <Link href={pages.contacts.href} className={style.link}>
                                Контакти
                            </Link>
                            <Link href={pages.reporting.href} className={style.link}>
                                Звітність
                            </Link>
                            <Link href={pages.faq.href} className={style.link}>
                                FAQ
                            </Link>
                        </div>
                        <Link href={pages.policy.href} className={style.oferta}>
                            Оферта та Політика
                        </Link>
                    </div>
                    <div className={style.socials}>
                        {instagram && (
                            <a href={instagram} className={style.socials_icon} target="_blank">
                                <svg width="40" height="40" viewBox="0 0 40 40">
                                    <path
                                        d="M25.5 9H14.5C11.42 9 9 11.42 9 14.5V25.5C9 28.58 11.42 31 14.5 31H25.5C28.58 31 31 28.58 31 25.5V14.5C31 11.42 28.58 9 25.5 9ZM28.8 25.5C28.8 27.37 27.37 28.8 25.5 28.8H14.5C12.63 28.8 11.2 27.37 11.2 25.5V14.5C11.2 12.63 12.63 11.2 14.5 11.2H25.5C27.37 11.2 28.8 12.63 28.8 14.5V25.5Z"
                                    />
                                    <path
                                        d="M20 14.5C16.92 14.5 14.5 16.92 14.5 20C14.5 23.08 16.92 25.5 20 25.5C23.08 25.5 25.5 23.08 25.5 20C25.5 16.92 23.08 14.5 20 14.5ZM20 23.3C18.13 23.3 16.7 21.87 16.7 20C16.7 18.13 18.13 16.7 20 16.7C21.87 16.7 23.3 18.13 23.3 20C23.3 21.87 21.87 23.3 20 23.3Z"
                                    />
                                    <path
                                        d="M25.5004 15.6004C26.1079 15.6004 26.6004 15.1079 26.6004 14.5004C26.6004 13.8929 26.1079 13.4004 25.5004 13.4004C24.8929 13.4004 24.4004 13.8929 24.4004 14.5004C24.4004 15.1079 24.8929 15.6004 25.5004 15.6004Z"
                                    />
                                </svg>
                            </a>
                        )}
                        {twitter && (
                            <a href={twitter} className={style.socials_icon} target="_blank">
                                <svg width="40" height="40" viewBox="0 0 40 40">
                                    <path
                                        d="M30.82 11.3398C29.93 11.8698 28.95 12.2498 27.9 12.4598C27.06 11.5698 25.86 11.0098 24.54 11.0098C22 11.0098 19.94 13.0698 19.94 15.6098C19.94 15.9698 19.98 16.3198 20.06 16.6598C16.22 16.4598 12.83 14.6298 10.56 11.8398C10.16 12.5198 9.94 13.3098 9.94 14.1598C9.94 15.7598 10.75 17.1698 11.99 17.9898C11.24 17.9698 10.53 17.7598 9.91 17.4098C9.91 17.4298 9.91 17.4498 9.91 17.4698C9.91 19.6998 11.5 21.5598 13.6 21.9798C13.21 22.0898 12.81 22.1398 12.39 22.1398C12.09 22.1398 11.81 22.1098 11.52 22.0598C12.11 23.8898 13.81 25.2198 15.82 25.2598C14.24 26.4898 12.26 27.2298 10.1 27.2298C9.73 27.2298 9.36 27.2098 9 27.1698C11.04 28.4798 13.46 29.2398 16.06 29.2398C24.53 29.2398 29.16 22.2298 29.16 16.1398C29.16 15.9398 29.16 15.7398 29.15 15.5398C30.05 14.8898 30.83 14.0798 31.44 13.1598C30.62 13.5298 29.73 13.7698 28.8 13.8798C29.75 13.3098 30.48 12.4098 30.83 11.3298L30.82 11.3398Z"
                                    />
                                </svg>
                            </a>
                        )}
                        {facebook && (
                            <a href={facebook} className={style.socials_icon} target="_blank">
                                <svg width="40" height="40" viewBox="0 0 40 40">
                                    <path
                                        d="M22.12 14.1C22.12 13.19 22.72 12.98 23.14 12.98H25.73V9.00003H22.16C18.2 8.99003 17.29 11.95 17.29 13.85V16.5H15V20.6H17.29V32.2H22.11V20.6H25.36L25.78 16.5H22.11V14.09L22.12 14.1Z"
                                    />
                                </svg>
                            </a>
                        )}
                        {telegram && (
                            <a href={telegram} className={style.socials_icon} target="_blank">
                                <svg width="40" height="40" viewBox="0 0 40 40">
                                    <path
                                        d="M28.303 12.0896L9.01298 19.5296C7.69298 20.0496 7.71298 20.7796 8.78298 21.1196L13.723 22.6596L25.173 15.4496C25.703 15.0996 26.203 15.2996 25.793 15.6496L16.523 24.0196L16.173 29.1096C16.693 29.1096 16.913 28.8896 17.183 28.6196L19.593 26.2996L24.593 29.9796C25.503 30.4996 26.153 30.2296 26.403 29.1296L29.683 13.6596C29.973 12.3096 29.193 11.7696 28.293 12.0896H28.303Z"
                                    />
                                </svg>
                            </a>
                        )}
                    </div>

                </div>

            </div>
        </ReactPortal>
    )
}

export default HeaderMenu
