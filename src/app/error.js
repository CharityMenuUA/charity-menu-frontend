'use client'

import {useEffect} from 'react'
import style from "@/app/styles/not-found.module.scss"

export default function Error({error, reset = () => location.reload()}) {
    useEffect(() => {
        // Log the error to an error reporting service
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