'use server'

import {getList} from "@/helpers/dataProvider"

export const getAccumulated = async () => {
    try {
        return await getList(`/chefs/accumulated`).then(data => data.json())
    } catch {
        return {
            amount: 0
        }
    }
}