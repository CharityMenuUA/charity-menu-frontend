"use server"
import {getList, getOne, create} from "@/helpers/dataProvider"

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

export const createOrder = async (chefId, menuId, params, accessToken) => {
    return await create(`/chefs/${chefId}/menu-item/${menuId}`, {
        ...params,
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    }).then(data => data.json())
}


