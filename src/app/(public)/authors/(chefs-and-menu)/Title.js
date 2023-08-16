"use client"

import style from './style.module.scss'
import {Switcher, useSwitcherContext} from "@/app/components/switcher/Switcher"

const Title = () => {
    const {value} = useSwitcherContext()
    return (
        <>
            <h1 className={style.h1}>{value ? "Всі пропозиції" : "Всі автори"}</h1>
            <Switcher/>
        </>
    )
}

export default Title