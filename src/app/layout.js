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
import {GoogleAnalytics} from "@next/third-parties/google";
import SaveStateProvider from "@/app/providers/save-state/SaveStateItemsProvider"
import GoogleConsent from "@/app/components/GoogleConsent/GoogleConsent"

const unbounded = Unbounded({subsets: ['cyrillic', 'latin'], variable: '--font-unbounded'})
const openSans = Open_Sans({subsets: ['cyrillic', 'latin'], variable: '--font-open-sans'})

export const revalidate = 0;

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
        <GoogleAnalytics gaId="G-5V9YXQJLCN"/>
        <GoogleConsent/>
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
