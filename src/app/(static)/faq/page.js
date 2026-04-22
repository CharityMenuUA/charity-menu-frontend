import FaqPage from "@/app/(static)/faq/client-page"

export const revalidate = 3600

const meta = {
    title: 'Часті запитання - Все, що вам потрібно знати про нашу платформу донатів',
    description: 'Детальна інформація про нашу платформу та як ми допомагаємо ЗСУ. Знайдіть відповіді на запитання, що стосуються нашої діяльності.',
}
export const metadata = {
    ...meta,
    openGraph: {
        ...meta,
    }
}
export default FaqPage
