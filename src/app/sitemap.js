import pages from "@/app/components/breadcrumbs/routing"
import {getList} from "@/helpers/dataProvider"

// Regenerate at most once per hour. Without this, every crawler fetch re-runs
// the 10k-item pageSize request below and the lastModified timestamp changes,
// which signals "always stale" to search engines.
export const revalidate = 3600

const BASE_URL = "https://www.donatemenu.com"

const sitemap = async () => {
    const menuIds = []
    const chefIds = []

    const menu = await getList(`/menu-items`, {
        params: {pageSize: 10000},
        next: {revalidate: 3600},
    }).catch((err) => {
        console.error("[sitemap] failed to fetch menu items:", err)
        return null
    })

    menu?.menuItems?.forEach(({menuItem, chef}) => {
        if (!chefIds.includes(chef.id)) {
            chefIds.push(chef.id)
        }
        menuIds.push({
            id: menuItem.id,
            chef: chef.id,
        })
    })

    // Same timestamp for every entry in a single generation. Since revalidate
    // is 3600s this value only changes at most once per hour, which is far
    // better than "changed this millisecond" on every crawl.
    const lastModified = new Date()

    const staticUrls = Object.values(pages)
        .filter(({sitemap}) => sitemap)
        .map(({href}) => ({url: `${BASE_URL}${href === '/' ? '' : href}`}))

    const chefUrls = chefIds.map((id) => ({
        url: `${BASE_URL}/${pages.authors.href.replace(/^\//, '')}/${id}`,
    }))

    const menuUrls = menuIds.map(({id, chef}) => ({
        url: `${BASE_URL}/${pages.authors.href.replace(/^\//, '')}/${chef}/${id}`,
    }))

    return [...staticUrls, ...chefUrls, ...menuUrls].map(({url}) => ({
        url,
        lastModified,
    }))
}

export default sitemap
