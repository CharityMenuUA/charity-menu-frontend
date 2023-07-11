'use client'
import Link from 'next/link'
import style from './headerMenu.module.scss'
import ReactPortal from '../portal/ReactPortal'
import SupportButton from './SupportButton'
import HeaderLogo from './HeaderLogo'


const HeaderMenu = (props) => {
    const {isOpen, setOpen} = props
    if (!isOpen) return false

    const handleCloseMenu = () => setOpen(false)

    return (
        <ReactPortal>
            <div className={style.headerMenu}>
                <div className={style.mask} onClick={handleCloseMenu} />
                <div className={style.content}>
                    <button type={'button'} className={style.close} onClick={handleCloseMenu}>
                        <svg viewBox="0 0 40 40">
                            <path d="M12.9287 12.929L27.0708 27.0711" />
                            <path d="M12.9287 27.071L27.0708 12.9289" />
                        </svg>
                    </button>
                    <div className={style.container}>
                        <HeaderLogo className={style.logo} />
                        <div className={style.text}>
                            Благодійний проект, гроші з якого йдуть на допомогу Україні. Благодійний проект, гроші з
                            якого
                            йдуть на допомогу Україні
                        </div>
                        <SupportButton />
                        <div className={style.navigate}>
                            <Link href={'/team'}>
                                Команда
                            </Link>
                            <Link href={'/contacts'}>
                                Контакти
                            </Link>
                            <Link href={'/partners'}>
                                Партнери
                            </Link>
                            <Link href={'/faq'} >
                               FAQ
                            </Link>
                        </div>

                    </div>
                    <div className={style.socials}>
                        <a href="https://www.instagram.com/" className={style.socials_icon} target="_blank">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M30 0C13.4581 0 0 13.4581 0 30C0 46.5407 13.4581 60 30 60C46.5407 60 60 46.5407 60 30C60 13.4581 46.5431 0 30 0ZM43.3831 23.1338C43.3964 23.4311 43.4037 23.7308 43.4037 24.0304C43.4037 33.1552 36.4602 43.6732 23.7561 43.6732C19.8566 43.6732 16.2265 42.5336 13.1717 40.5736C13.7118 40.6376 14.2617 40.6703 14.8187 40.6703C18.0549 40.6703 21.0312 39.5658 23.3948 37.7145C20.3738 37.6589 17.8228 35.6626 16.9443 32.9183C17.3649 32.9981 17.7987 33.0428 18.2422 33.0428C18.8717 33.0428 19.4832 32.9606 20.062 32.8023C16.9032 32.1691 14.5239 29.3789 14.5239 26.0316C14.5239 26.0026 14.5239 25.9724 14.5251 25.9446C15.4556 26.4606 16.5202 26.7723 17.6513 26.8074C15.8 25.5712 14.5807 23.4565 14.5807 21.0614C14.5807 19.795 14.9202 18.6083 15.5148 17.5884C18.9189 21.7671 24.0087 24.515 29.7462 24.805C29.6278 24.2987 29.5686 23.7731 29.5686 23.2305C29.5686 19.4179 32.6597 16.3256 36.4722 16.3256C38.4589 16.3256 40.2509 17.1643 41.5125 18.5056C43.0871 18.1962 44.5613 17.6235 45.8991 16.8295C45.3794 18.4428 44.2882 19.795 42.8587 20.6505C44.2568 20.4838 45.5909 20.114 46.8247 19.5642C45.9039 20.9466 44.7329 22.1635 43.3831 23.1338Z"
                                    fill="url(#paint0_linear_6_68)" />
                                <defs>
                                    <linearGradient id="paint0_linear_6_68" x1="-5.08474" y1="60" x2="60"
                                        y2="3.73603e-06" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F12711" />
                                        <stop offset="1" stopColor="#F5AF19" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/" className={style.socials_icon} target="_blank">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M30 0C13.4581 0 0 13.4581 0 30C0 46.5407 13.4581 60 30 60C46.5407 60 60 46.5407 60 30C60 13.4581 46.5431 0 30 0ZM37.4607 31.0561H32.58V48.4524H25.3476C25.3476 48.4524 25.3476 38.9471 25.3476 31.0561H21.9097V24.9078H25.3476V20.9309C25.3476 18.0827 26.701 13.6321 32.6464 13.6321L38.0057 13.6526V19.621C38.0057 19.621 34.749 19.621 34.1158 19.621C33.4826 19.621 32.5824 19.9376 32.5824 21.2958V24.909H38.0927L37.4607 31.0561Z"
                                    fill="url(#paint0_linear_6_51)" />
                                <defs>
                                    <linearGradient id="paint0_linear_6_51" x1="-5.08474" y1="60" x2="60"
                                        y2="3.73603e-06" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F12711" />
                                        <stop offset="1" stopColor="#F5AF19" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </a>
                        <a href="https://telegram.org/" className={style.socials_icon} target="_blank">
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M30 60C46.5725 60 60 46.5725 60 30C60 13.4275 46.5725 0 30 0C13.4275 0 0 13.4275 0 30C0 46.5725 13.4275 60 30 60ZM13.7275 29.35L42.6525 18.1975C43.995 17.7125 45.1675 18.525 44.7325 20.555L44.735 20.5525L39.81 43.755C39.445 45.4 38.4675 45.8 37.1 45.025L29.6 39.4975L25.9825 42.9825C25.5825 43.3825 25.245 43.72 24.47 43.72L25.0025 36.0875L38.9025 23.53C39.5075 22.9975 38.7675 22.6975 37.97 23.2275L20.7925 34.0425L13.3875 31.7325C11.78 31.2225 11.745 30.125 13.7275 29.35Z"
                                    fill="url(#paint0_linear_6_27)" />
                                <defs>
                                    <linearGradient id="paint0_linear_6_27" x1="-5.08475" y1="60" x2="60"
                                        y2="3.73603e-06" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F12711" />
                                        <stop offset="1" stopColor="#F5AF19" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </a>
                    </div>

                </div>
            </div>
        </ReactPortal>
    )
}

export default HeaderMenu
