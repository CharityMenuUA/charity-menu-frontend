'use server'

import {get} from "@/helpers/dataProvider"

export const getRandom = async () => {
    return  get('/random/menu-item').catch((err) => console.error(err))
}