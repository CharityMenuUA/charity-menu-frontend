'use server'

import {create, update, get, getOne} from "@/helpers/dataProvider"

export const setProfile = async (accessToken, data) => {
    return create(`/profile`, {
        body: data,
        headers: {"Authorization": `Bearer ${accessToken}`},
    }).catch((err) => console.error(err))
}

export const setChef = async (accessToken) => {
    return create(`/profile/chef`, {
        headers: {"Authorization": `Bearer ${accessToken}`},
    }).catch((err) => console.error(err))
}

export const updateProfile = async (accessToken, data) => {
    return update(`/profile`, {
        body: data,
        headers: {"Authorization": `Bearer ${accessToken}`},
    }).catch((err) => console.error(err))
}


export const getProfile = async (accessToken) => {
    return get(`/profile`, {
        headers: {"Authorization": `Bearer ${accessToken}`},
    }).catch((err) => console.error(err))
}

// Fetches PAID and COMPLETED orders in parallel; falls back to empty lists on error.
const getOrdersByState = async (resource, accessToken) => {
    const fetchState = (state) => get(resource, {
        params: {state},
        headers: {"Authorization": `Bearer ${accessToken}`},
    })
    try {
        const [paid, completed] = await Promise.all([fetchState("PAID"), fetchState("COMPLETED")])
        return {paid, completed}
    } catch (err) {
        return {paid: [], completed: []}
    }
}

export const getOrders = async (accessToken) => getOrdersByState(`/profile/orders`, accessToken)

export const getOrderedOrders = async (accessToken) => getOrdersByState(`/profile/chef/orders`, accessToken)

export const getMenu = async (accessToken) => {
    try {
        const menu = await get(`/profile/chef/menu-item`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return {menu}
    } catch (err) {
        return {
            menu: [],
        }
    }
}


export const getMenuItem = async (menuId) => {
    return getOne(`/menu-items/`, menuId)
}

export const createMenu = async (accessToken, data) => {
    return create(`/profile/chef/menu-item`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        body: data,
    })
}

export const updateMenu = async (accessToken, data, menuId) => {
    return update(`/profile/chef/menu-item/${menuId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        body: data,
    })
}
export const updateMenuOpen = async (accessToken, menuId) => {
    return update(`/profile/chef/menu-item/${menuId}/open`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    })
}
export const updateMenuClose = async (accessToken, menuId) => {
    return update(`/profile/chef/menu-item/${menuId}/close`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    })
}

export const setCompleted = async (accessToken, orderId) => {
    return create(`/profile/chef/orders/${orderId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    }).catch((err) => console.error(err))
}
