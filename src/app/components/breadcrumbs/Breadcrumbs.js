"use client"
import style from './breadcrumbs.module.scss'
import {useParams, usePathname} from "next/navigation"
import Link from "next/link"
import {useEffect, useState} from "react"
import {getChef, getMenuItem} from "@/app/components/actions"
import pages from "@/app/components/breadcrumbs/routing"

const Breadcrumbs = () => {
    const pathname = usePathname()
    const params = useParams()
    const [chef, setChef] = useState()
    const [menu, setMenu] = useState()
    const {chefId, menuId} = params

    useEffect(() => {
        if (chefId) getChef({chefId}).then(setChef).catch(console.error)
        if (menuId) getMenuItem({menuId}).then(setMenu).catch(console.error)
    }, [chefId, menuId])

    const pathList = pathname.split('/').filter((path) => path)


    const links = [
        {
            href: pages.home.href,
            name: pages.home.name,
        }
    ]

    const pagesArray = Object.values(pages)

    pathList.forEach((name, key) => {
        const href = `/${pathList.slice(0, key + 1).join('/')}`
        links.push({
            href,
            name: pagesArray.find((e) => e.href === href)?.name || name
        })
    })

    if (links[2] && links[2].name === params?.chefId && chef?.name) links[2].name = chef?.name

    if (links[3] && links[3].name === params?.menuId && menu?.title) links[3].name = menu?.title

    if (pathname === '/' || pathname === '/menu') return

    return (
        <ul className={style.breadcrumbs} itemScope itemType="https://schema.org/BreadcrumbList">
            {links.map(({href, name}, key) => (
                <li key={key} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href={href} itemProp="item">
                        {!!key && ' / '} {name}
                        <span itemProp="name" content={name}/>
                        <span itemProp="position" content={`${key + 1}`}/>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Breadcrumbs
