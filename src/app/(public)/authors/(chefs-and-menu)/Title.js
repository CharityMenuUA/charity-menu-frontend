"use client"

import style from './style.module.scss'
import {usePathname} from "next/navigation"
import {SwitcherLink} from "@/app/components/switcher/SwitcherLink"

const Title = () => {
    const pathname = usePathname()
    const value = pathname === "/authors/menu"
    return (
        <>
            <h1 className={style.h1}>{value ? "Всі пропозиції" : "Всі автори"}</h1>
            <SwitcherLink from={"/authors"} to={"/authors/menu"}/>
        </>
    )
}

export default Title

