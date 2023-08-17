import pages from "@/app/components/breadcrumbs/routing"
import {getList} from "@/helpers/dataProvider"


const sitemap = async () => {
    const url = "www.donatemenu.com"

    const menuIds = []
    const chefIds = []

    const menu = await getList(`/menu-items`, {
        params: {pageSize: 10000}
    })

    menu?.menuItems.forEach(({menuItem, chef}) => {
        if (!chefIds.includes(chef.id)) {
            chefIds.push(chef.id)
        }
        menuIds.push({
            id: menuItem.id,
            chef: chef.id
        })
    })

    const staticUrls = Object.values(pages).filter(({sitemap}) => sitemap).map(({href}) => ({
        url: `${url}${href ? `/${href}` : ''}`,
    }))

    const chefUrls = chefIds.map((id) => ({
        url: `${url}/${pages.authors.href}/${id}`
    }))

    const menuUrls = menuIds.map(({id, chef}) => ({
        url: `${url}/${pages.authors.href}/${chef}/${id}`
    }))

    return [
        ...staticUrls,
        ...chefUrls,
        ...menuUrls,
    ].map(({url}) => ({
        url: `https://${url.replace(/\/\//gi, '/')}`,
        lastModified: new Date(),
    }))
}

export default sitemap