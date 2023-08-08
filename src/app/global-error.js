'use client'

import {useEffect} from 'react'
import style from "@/app/styles/not-found.module.scss"

export default function GlobalError({error, reset = () => location.reload()}) {
    useEffect(() => {
        console.error(error)
    }, [error])
    return (
        <div className={style.notFoundPage}>
            <h2 className={style.title}>
                Упс..
            </h2>
            <div className={style.text}>
                Щось пішло не так.
            </div>
            <button onClick={() => reset()} className={style.link}>
                Оновити сторінку
            </button>
        </div>
    )
}