"use server"
import {getList, getOne, create} from "@/helpers/dataProvider"

export const getPopularMenuItem = async () => {
    return getList(`/menu-items`, {
        params: {
            pageSize: 4,
            sortBy: "POPULARITY"
        },
        next: {revalidate: 0}
    })
}

export const getMenuItem = async (params) => {
    const {menuId} = params
    return getOne(`/menu-items/`, menuId)
}

export const getChef = async (params) => {
    const {chefId} = params
    return getOne(`chefs`, chefId)
}

export const createOrder = async (chefId, menuId, params, accessToken) => {
    return await create(`/chefs/${chefId}/menu-item/${menuId}`, {
        ...params,
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    })
}


export const getChefs = async () => {
    return getList('/chefs', {
        params: {
            pageSize: 7,
        }
    })
}