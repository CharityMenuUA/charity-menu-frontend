'use server'

import {get} from "@/helpers/dataProvider"

export const getRandom = async () => {
    try {
        return await get('/random/menu-item', {next: {revalidate: 0}}).then((data) => data.json())
    } catch {
        return {}
    }
}