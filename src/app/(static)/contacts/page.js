import style from './style.module.scss'

const contactItems = [
    {
        id: 1,
        label: 'Телефон',
        text: <a href={'tel:+380635891339'}>+380635891339</a>
    },
    {
        id: 2,
        label: 'Email',
        text: <a href={'mailto:donatemenu@hello.com.ua'}>donatemenu@hello.com.ua</a>
    },
    {
        id: 3,
        label: 'Telegram',
        text: <a href={'https://t.me/donatemenu'} target="_blank">@donatemenu</a>
    },
]

const ContactsPage = () => {
    return (
        <div className={style.contacts}>
            <h1>Контакти</h1>
            <div className={style.items_wrap}>
                {
                    contactItems.map((item) => {
                        return (
                            <div className={style.item} key={item.id}>
                                <div className={style.label}>{item.label}</div>
                                <div className={style.text}>{item.text}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ContactsPage
