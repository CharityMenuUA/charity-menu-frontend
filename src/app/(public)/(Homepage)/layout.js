import Accumulated from "@/app/components/accumulated/Accumulated"
import {getAccumulated} from "@/app/(public)/(Homepage)/actions"
import style from "@/app/(public)/(Homepage)/homepage.module.scss"
import {Switcher} from "@/app/components/switcher/Switcher"

const ChefsLayout = async ({children}) => {
    const accumulated = await getAccumulated()
    return (
        <>
            <Accumulated amount={accumulated.amount}/>
            <div className={style.homepage}>
                <section className={style.head}>
                    <h1>
                        Знаменитості склали меню і ти можеш зробити замовлення просто зараз.
                    </h1>
                    <div className={style.text}>
                        Благодійний проект, гроші з якого йдуть на допомогу Україні.
                    </div>
                </section>
                <Switcher/>
                {children}
            </div>
        </>
    )
}

export default ChefsLayout