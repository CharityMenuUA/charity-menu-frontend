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
import Script from "next/script"
import SaveStateProvider from "@/app/providers/save-state/SaveStateItemsProvider"

const unbounded = Unbounded({subsets: ['cyrillic', 'latin'], variable: '--font-unbounded'})
const openSans = Open_Sans({subsets: ['cyrillic', 'latin'], variable: '--font-open-sans'})

export const revalidate = 10;

const meta = {
    title: "Донат меню - платформа донатів на ЗСУ",
    description: 'Платформа, на якій ти зможеш отримати приємні емоції, а Україна реальну допомогу.',
    images: ['/preview.png']
}

export const metadata = {
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
        <html lang="uk">
        <body className={`${unbounded.variable} ${openSans.variable}`}>
        <Script strategy="beforeInteractive" async src="https://www.googletagmanager.com/gtag/js?id=G-5V9YXQJLCN"/>
        <Script strategy="beforeInteractive" id={"google-analytics"}>{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5V9YXQJLCN');
        `}</Script>
        <Script strategy="beforeInteractive" id={"google-tag"}>{`(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-P44NS976');`}</Script>
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P44NS976"
                    height="0" width="0" style={{display: "none", visibility: "hidden"}}>

            </iframe>
        </noscript>
        <ErrorBoundary>
            <ConfigProvider config={config}>
                <UserProvider>
                    <SuccessProvider>
                        <Header/>
                        <main>
                            <Breadcrumbs params={params}/>
                            <SaveStateProvider>
                                {children}
                            </SaveStateProvider>
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
