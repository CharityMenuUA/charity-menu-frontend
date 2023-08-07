import style from './footer.module.scss'
import Link from "next/link"
import pages from "@/app/components/breadcrumbs/routing"

const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.left}>
                © 2023
            </div>
            <div className={style.center}>
                <Link href={pages.contacts.href}>
                    Контакти
                </Link>
                <Link href={pages.team.href}>
                    Команда
                </Link>
                <Link href={pages.faq.href}>
                    FAQ
                </Link>
            </div>
            <div className={style.right}>
                <Link href={pages.policy.href}>
                    Оферта
                </Link>
            </div>
        </div>
    )
}
export default Footer
