import style from './style.module.scss'

export default function StaticLayout ({ children }) {
    return <section className={style.static}>{children}</section>
}
