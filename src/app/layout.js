import './styles/globals.scss'
import {Open_Sans, Unbounded} from 'next/font/google'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import UserProvider from '@/app/providers/firebase/UserProvider'
import ConfigProvider from "@/app/providers/config/ConfigProvider"
import {get} from "@/helpers/dataProvider"

const unbounded = Unbounded({subsets: ['cyrillic', 'latin'], variable: '--font-unbounded'})
const openSans = Open_Sans({subsets: ['cyrillic', 'latin'], variable: '--font-open-sans'})

export const metadata = {
    title: 'Донат меню',
    description: 'Донат меню - платформа донатів на ЗСУ',
}

const getConfig = async () => {
    try {
        return await get('/configs').then(data => data.json())
    } catch {
        return {}
    }
}

export default async function RootLayout({children}) {
    const config = await getConfig()

    return (
        <html lang="en">
        <body className={`${unbounded.variable} ${openSans.variable}`}>
        <ConfigProvider config={config}>
            <UserProvider>
                <Header/>
                <main>
                    {children}
                </main>
                <Footer/>
            </UserProvider>
        </ConfigProvider>
        </body>
        </html>
    )
}
