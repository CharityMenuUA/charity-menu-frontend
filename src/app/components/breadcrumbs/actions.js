"use server"
import {getOne} from "@/helpers/dataProvider"

export const getMenuItem = async (params) => {
    const {menuId} = params
    try {
        return await getOne(`/menu-items/`, menuId).then(data => data.json())
    } catch {
        return {}
    }
}

export const getChef = async (params) => {
    const {chefId} = params
    try {
        return await getOne(`chefs`, chefId).then(data => data.json())
    } catch {
        return {}
    }
}
