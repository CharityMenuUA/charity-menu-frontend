"use client"
import style from './breadcrumbs.module.scss'
import {useParams, usePathname} from "next/navigation"
import Link from "next/link"

const Breadcrumbs = () => {
    const pathname = usePathname()
    const params = useParams()

    console.log(params, pathname)

    const links = [{
        name: 'Головна',
        href: '/'
    }]

    if(params.chefId) {
        links.push({
            name: 'Виконавці',
            href: 'chefs'
        })
    }

    return (
        <div className={style.breadcrumbs}>
            {links.map(({href, name}, key) => (
                <Link key={key} href={href}>{!!key && '/'}{name}</Link>
            ))}
        </div>
    )
}

export default Breadcrumbs