'use client'
import style from './homepage.module.scss'
import Link from 'next/link'
import {useSwitcherContext} from "@/app/components/switcher/Switcher"
import HomeChefs from "@/app/(public)/(Homepage)/HomeChefs"
import HomeMenu from "@/app/(public)/(Homepage)/HomeMenu"
import pages from "@/app/components/breadcrumbs/routing"

const HomeChefsAndOffers = (props) => {
    const {chefs, menuItems} = props
    const {value} = useSwitcherContext()
    return (
        <>
            <div className={style.content}>
                <HomeChefs chefs={chefs}/>
                <HomeMenu menuItems={menuItems}/>
            </div>
            <Link href={value ? `${pages.authors.href}?menu=1` : pages.authors.href} className={style.button_more}>
                {value ? 'Усі пропозиції' : 'Усі автори'} &nbsp;
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
                    <path
                        d="M0.0361874 4.216H7.06019L9.89219 4.6V6.552L7.06019 6.952H0.0361874V4.216ZM7.26819 0.0719995L12.4842 5.576L7.26819 11.096L5.58819 9.496L10.2122 4.76V6.408L5.58819 1.656L7.26819 0.0719995Z"
                        fill="white"/>
                </svg>
            </Link>
        </>
    )
}

export default HomeChefsAndOffers