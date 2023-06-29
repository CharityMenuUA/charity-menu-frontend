import style from './styles/not-found.module.scss'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className={style.notFoundPage}>
            <h2 className={style.title}>
                4<span>0</span>4
            </h2>
            <div className={style.text}>
                Тут нічого немає
            </div>
            <Link href="/" className={style.link}>
                На головну
            </Link>
        </div>
    )
}