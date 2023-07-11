import './styles/globals.scss'
import {Open_Sans, Unbounded} from 'next/font/google'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import UserProvider from '@/app/firebase/firebase/UserProvider'

const unbounded = Unbounded({subsets: ['cyrillic', 'latin'], variable: '--font-unbounded'})
const openSans = Open_Sans({subsets: ['cyrillic', 'latin'], variable: '--font-open-sans'})

export const metadata = {
    title: 'Донат меню',
    description: 'Донат меню - платформа донатів на ЗСУ',
}

export default function RootLayout({children}) {

    return (
        <html lang="en">
            <body className={`${unbounded.variable} ${openSans.variable}`}>
                <UserProvider>
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </UserProvider>
            </body>
        </html>
    )
}
