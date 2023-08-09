import './styles/globals.scss'
import {Open_Sans, Unbounded} from 'next/font/google'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import UserProvider from '@/app/providers/firebase/UserProvider'
import ConfigProvider from "@/app/providers/config/ConfigProvider"
import {get} from "@/helpers/dataProvider"
import Breadcrumbs from "@/app/components/breadcrumbs/Breadcrumbs"
import SuccessProvider from "@/app/providers/success/SuccessProvider"
import ErrorBoundary from "@/app/components/error/ErrorBoundary"

const unbounded = Unbounded({subsets: ['cyrillic', 'latin'], variable: '--font-unbounded'})
const openSans = Open_Sans({subsets: ['cyrillic', 'latin'], variable: '--font-open-sans'})

const meta = {
    title: {
        template: '%s - Донат меню - платформа донатів на ЗСУ',
        default: 'Донат меню - платформа донатів на ЗСУ',
    },
    description: 'Платформа, на якій ти змжеш отримати приємні емоції, а Україна реальну допомогу.',
    images: ['/preview.png']
}

export const metadata = {
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL('https://acme.com'),
    ...meta,
    openGraph: {
        ...meta,
        type: 'website',
    }
}


const getConfig = async () => {
    return get('/configs').catch((err) => console.error(err))
}

const RootLayout = async (props) => {
    const {children, params} = props
    const config = await getConfig()

    return (
        <html lang="en">
        <body className={`${unbounded.variable} ${openSans.variable}`}>
        <ErrorBoundary>
            <ConfigProvider config={config}>
                <UserProvider>
                    <SuccessProvider>
                        <Header/>
                        <main>
                            <Breadcrumbs params={params}/>
                            {children}
                        </main>
                        <Footer/>
                    </SuccessProvider>
                </UserProvider>
            </ConfigProvider>
        </ErrorBoundary>
        </body>
        </html>
    )
}

export default RootLayout
