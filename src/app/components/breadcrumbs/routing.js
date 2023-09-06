const pages = {
    '': {
        name: 'Головна',
        href: '/',
        sitemap: true
    },
    authors: {
        name: 'Всі автори',
        href: '/authors',
        sitemap: true
    },
    menu: {
        name: 'Всі пропозиції',
        href: '/authors?menu=1'
    },
    profile: {
        name: 'Мiй профіль',
        href: '/profile'
    },
    settings: {
        name: 'Налаштування',
        href: '/profile/settings'
    },
    ordered: {
        name: 'Замовили в мене',
        href: '/profile/ordered'
    },
    team: {
        name: 'Команда',
        href: '/team',
        sitemap: true
    },
    contacts: {
        name: 'Контакти',
        href: '/contacts',
        sitemap: true
    },
    faq: {
        name: 'FAQ',
        href: '/faq',
        sitemap: true
    },
    login: {
        name: 'Вхід',
        href: '/login',
        sitemap: true
    },
    register: {
        name: 'Реєстрація',
        href: '/register',
        sitemap: true
    },
    "register-email-confirm": {
        name: 'Підтвердження пошти',
        href: '/register-email-confirm'
    },
    "register-complete": {
        name: 'Завершення реєстрації',
        href: '/register-complete'
    },
    "new-password": {
        name: 'Новий пароль',
        href: '/new-password'
    },
    "forgot-password": {
        name: 'Забули пароль?',
        href: '/forgot-password'
    },
    reporting: {
        name: 'Звітність',
        href: '/reporting',
        sitemap: true
    },
    policy: {
        name: 'Оферта та Політика данних',
        href: '/policy',
        sitemap: true
    }
}

export default pages
