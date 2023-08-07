const pages = {
    '': {
        name: 'Головна',
        href: '',
    },
    chefs: {
        name: 'Всі автори',
        href: 'chefs'
    },
    menu: {
        name: 'Всі пропозиції',
        href: 'chefs?menu=1'
    },
    profile: {
        name: 'Мiй профіль',
        href: 'profile'
    },
    settings: {
        name: 'Налаштування',
        href: 'profile/settings'
    },
    ordered: {
        name: 'Замовили в мене',
        href: 'profile/ordered'
    },
    team: {
        name: 'Команда',
        href: 'team'
    },
    contacts: {
        name: 'Контакти',
        href: 'contacts'
    },
    faq: {
        name: 'FAQ',
        href: 'faq'
    },
    register: {
        name: 'Реєстрація',
        href: 'register'
    },
    partners: {
        name: 'Партнери',
        href: 'partners'
    } ,
    reporting: {
        name: 'Звітність',
        href: 'reporting'
    },
    policy: {
        name: 'Оферта',
        href: '/policy'
    }
}

export default pages
