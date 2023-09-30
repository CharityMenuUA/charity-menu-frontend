import Accumulated from "@/app/components/accumulated/Accumulated"
import {getAccumulated} from "@/app/(public)/(Homepage)/actions"
import style from "@/app/(public)/(Homepage)/homepage.module.scss"
import {SwitcherLink} from "@/app/components/switcher/SwitcherLink"

const ChefsLayout = async ({children}) => {
    const accumulated = await getAccumulated()
    return (
        <>
            <div className={style.homepage}>
                <Accumulated amount={accumulated.amount}/>
                <section className={style.head}>
                    <h1>
                        Класні люди склали меню і ти можеш зробити замовлення просто зараз.
                    </h1>
                    <div className={style.text}>
                        Благодійний проект, гроші з якого йдуть на допомогу Україні.
                    </div>
                </section>
                <SwitcherLink from={'/'} to={'/menu'}/>
                {children}
            </div>
        </>
    )
}

export default ChefsLayout
