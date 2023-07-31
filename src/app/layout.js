import './styles/globals.scss'
import {Open_Sans, Unbounded} from 'next/font/google'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import UserProvider from '@/app/providers/firebase/UserProvider'
import ConfigProvider from "@/app/providers/config/ConfigProvider"
import {get} from "@/helpers/dataProvider"
import Breadcrumbs from "@/app/components/breadcrumbs/Breadcrumbs"
import SwitcherProvider from "@/app/components/switcher/Switcher"
import SuccessProvider from "@/app/providers/success/SuccessProvider"

const unbounded = Unbounded({subsets: ['cyrillic', 'latin'], variable: '--font-unbounded'})
const openSans = Open_Sans({subsets: ['cyrillic', 'latin'], variable: '--font-open-sans'})

export const metadata = {
    title: {
        template: '%s - Донат меню - платформа донатів на ЗСУ',
        default: 'Донат меню - платформа донатів на ЗСУ',
    },
    description: 'Донат меню - платформа донатів на ЗСУ',
}

const getConfig = async () => {
    try {
        return await get('/configs').then(data => data.json())
    } catch {
        return {}
    }
}

const RootLayout = async (props) => {
    const {children, params} = props
    const config = await getConfig()
    return (
        <html lang="en">
        <body className={`${unbounded.variable} ${openSans.variable}`}>
        <ConfigProvider config={config}>
            <UserProvider>
                <SuccessProvider>
                    <SwitcherProvider>
                        <Header/>
                        <main>
                            <Breadcrumbs params={params}/>
                            {children}
                        </main>
                        <Footer/>
                    </SwitcherProvider>
                </SuccessProvider>
            </UserProvider>
        </ConfigProvider>
        </body>
        </html>
    )
}

export default RootLayout
