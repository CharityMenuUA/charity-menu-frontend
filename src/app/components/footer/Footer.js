import style from './footer.module.scss'

const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.left}>
                © 2023
            </div>
            <div className={style.center}>
                <div>
                    Контакти
                </div>
                <div>
                    Команда
                </div>
                <div>
                    FAQ
                </div>
            </div>
            <div className={style.right}>
                <div>
                    Оферта
                </div>
            </div>
        </div>
    )
}
export default Footer