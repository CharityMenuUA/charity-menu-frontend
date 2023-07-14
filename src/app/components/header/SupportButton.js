import style from './header.module.scss'

const SupportButton = ({link}) => {
    return (
        <a href={link} target={"_blank"} type={'button'} className={style.support_button}>
            Підтримати проект
        </a>
    )
}

export default SupportButton