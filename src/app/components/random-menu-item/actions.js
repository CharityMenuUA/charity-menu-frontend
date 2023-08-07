'use server'

import {get} from "@/helpers/dataProvider"

export const getRandom = async () => {
    try {
        return await get('/random/menu-item').then((data) => data.json())
    } catch {
        return {}
    }
}