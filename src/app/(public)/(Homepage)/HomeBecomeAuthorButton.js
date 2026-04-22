
import Link from "next/link"
import style from "@/app/(public)/(Homepage)/homepage.module.scss"


const HomeBecomeAuthorButton = () => {
    return (
        <div className={style.becomeAuthor}>
            <h3>Стань автором, щоб додавати власні пропозиції на сайті.</h3>
            <Link href={'/profile/settings#author'} className={style.button_more}>
                стати автором
            </Link>
        </div>
    )
}

export default HomeBecomeAuthorButton
