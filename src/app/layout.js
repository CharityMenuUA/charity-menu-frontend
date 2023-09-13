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
import SwitcherProvider from "@/app/components/switcher/Switcher"
import Script from "next/script"

const unbounded = Unbounded({subsets: ['cyrillic', 'latin'], variable: '--font-unbounded'})
const openSans = Open_Sans({subsets: ['cyrillic', 'latin'], variable: '--font-open-sans'})

const meta = {
    title: "Донат меню - платформа донатів на ЗСУ",
    description: 'Платформа, на якій ти зможеш отримати приємні емоції, а Україна реальну допомогу.',
    images: ['/preview.png']
}

export const metadata = {
    viewport: "width=device-width, initial-scale=1",
    metadataBase: new URL('https://www.donatemenu.com/'),
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
                    <SwitcherProvider>
                        <SuccessProvider>
                            <Header/>
                            <main>
                                <Breadcrumbs params={params}/>
                                {children}
                            </main>
                            <Footer/>
                        </SuccessProvider>
                    </SwitcherProvider>
                </UserProvider>
            </ConfigProvider>
        </ErrorBoundary>
        <Script strategy="lazyOnload" async src="https://www.googletagmanager.com/gtag/js?id=G-5V9YXQJLCN"/>
        <Script strategy="lazyOnload" id={"google-analytics"}>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5V9YXQJLCN');
        `}</Script>
        </body>
        </html>
    )
}

export default RootLayout
