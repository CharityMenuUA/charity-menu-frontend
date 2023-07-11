import style from './homepage.module.scss'
import HomeChefsAndOffers from '@/app/(homepage)/HomeChefsAndOffers'

const Home = () => {
    return (
        <div className={style.homepage}>
            <section className={style.head}>
                <h1>
                    Знаменитості склали меню і ти можеш зробити замовлення просто зараз.
                </h1>
                <div className={style.text}>
                    Благодійний проект, гроші з якого йдуть на допомогу Україні.
                </div>
            </section>
            <HomeChefsAndOffers />
        </div>
    )
}

export default Home