"use client"
import style from './breadcrumbs.module.scss'
import {useParams, usePathname} from "next/navigation"
import Link from "next/link"
import {useEffect, useState} from "react"
import {getChef, getMenuItem} from "@/app/components/actions"
import pages from "@/app/components/breadcrumbs/routing"

const getLink = (cur) => {
    if (pages[cur]) {
        return {
            name: pages[cur].name,
            href: `${pages[cur].href}/`
        }
    }
    return {
        name: cur,
        href: `${cur}/`
    }
}

const Breadcrumbs = () => {
    const pathname = usePathname()
    const params = useParams()
    const [chef, setChef] = useState()
    const [menu, setMenu] = useState()
    const {chefId, menuId} = params

    useEffect(() => {
        if (chefId) getChef({chefId}).then((e) => setChef(e))
        if (menuId) getMenuItem({menuId}).then((e) => setMenu(e))
    }, [chefId, menuId])

    const pathList = pathname.split('/')

    const links = pathList.reduce((acc, cur) => {
        const prevLink = acc[acc.length - 1]
        const link = getLink(cur)
        link.href = `${prevLink?.href || ''}${link.href}`
        return [...acc, link]
    }, [])


    if (links[2] && links[2].name === params?.chefId && chef?.name) links[2].name = chef?.name

    if (links[3] && links[3].name === params?.menuId && menu?.title) links[3].name = menu?.title

    if (pathname === '/' || pathname === '/menu') return

    const clearPath = (href) => `/${href.split('/').filter(Boolean).join('/')}`
    return (
        <ul className={style.breadcrumbs} itemScope itemType="https://schema.org/BreadcrumbList">
            {links.map(({href, name}, key) => (
                <li key={key}  itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href={clearPath(href)} itemProp="item">
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
