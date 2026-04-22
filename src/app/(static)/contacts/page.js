import ContactsPage from "@/app/(static)/contacts/client-page"

export const revalidate = 3600

const meta = {
    title: 'Контакти - Ваші питання та пропозиції важливі для нас',
    description: 'Наша команда завжди відкрита для спілкування з вами. Залиште нам повідомлення, і ми відповімо вам якнайшвидше.',
}
export const metadata = {
    ...meta,
    openGraph: {
        ...meta,
    }
}

export default ContactsPage

