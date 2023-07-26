'use server'

import {getList} from "@/helpers/dataProvider"

export const getChef = async () => {
    try {
        return await getList(`/chefs`, {params: {pageSize: 10}}).then(data => data.json())
    } catch {
        return {chefs: []}
    }
}

export const getMenu = async () => {
    try {
        return await getList(`/menu-items`, {params: {pageSize: 7}}).then(data => data.json())
    } catch {
        return {menuItems: []}
    }
}
export const getAccumulated = async () => {
    try {
        return await getList(`/chefs/accumulated`).then(data => data.json())
    } catch {
        return {
            amount: 0
        }
    }
}