'use server'

import {getList} from "@/helpers/dataProvider"

export const getChef = async (params) => {
    const {pageSize = 15, pageNumber = 0, direction = "DESC"} = params
    try {
        return await getList(`/chefs`, {
            params: {...params, pageSize, pageNumber, direction}
        }).then(data => data.json())
    } catch {
        return {chefs: []}
    }
}

export const getMenu = async (params) => {
    const {pageSize = 10, pageNumber = 0, direction = "DESC"} = params
    try {
        return await getList(`/menu-items`, {
            params: {...params, pageSize, pageNumber, direction}
        }).then(data => data.json())
    } catch {
        return {menuItems: []}
    }
}