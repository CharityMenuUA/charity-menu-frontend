'use server'

import {getList} from "@/helpers/dataProvider"

export const getPopularMenuItem = async () => {
    try {
        return await getList(`/menu-items`, {
            params: {
                pageSize: 4,
                sortBy: "POPULARITY"
            },
            next: {revalidate: 0}
        }).then(data => data.json())
    } catch {
        return {
            menuItems: []
        }
    }
}
