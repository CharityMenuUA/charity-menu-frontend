'use server'

import {create, update, get, getOne} from "@/helpers/dataProvider"

export const setProfile = async (accessToken, data) => {
    return create(`/profile`, {
        body: data,
        headers: {"Authorization": `Bearer ${accessToken}`},
    }).catch((err) => console.error(err))
}

export const updateProfile = async (accessToken, data) => {
    return update(`/profile`, {
        body: data,
        headers: {"Authorization": `Bearer ${accessToken}`},
    }).catch((err) => console.error(err))
}

export const setPhoto = async (accessToken, data) => {
    return create(`/profile/photo`, {
        body: data,
        headers: {"Authorization": `Bearer ${accessToken}`},
    }).catch((err) => console.error(err))
}

export const getProfile = async (accessToken) => {
    return get(`/profile`, {
        headers: {"Authorization": `Bearer ${accessToken}`},
    }).catch((err) => console.error(err))
}

export const getOrders = async (accessToken) => {
    try {
        const paid = await get(`/profile/orders`, {
            params: {
                state: "PAID"
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        const completed = await get(`/profile/orders`, {
            params: {
                state: "COMPLETED"
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return {
            paid,
            completed,
        }
    } catch (err) {
        return {
            paid: [],
            completed: []
        }
    }
}

export const getOrderedOrders = async (accessToken) => {
    try {
        const paid = await get(`/profile/chef/orders`, {
            params: {
                state: "PAID"
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        const completed = await get(`/profile/chef/orders`, {
            params: {
                state: "COMPLETED"
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        })
        return {
            paid,
            completed,
        }
    } catch (err) {
        return {
            paid: [],
            completed: []
        }
    }
}

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

export const setCompleted = async (accessToken, orderId) => {
    return create(`/profile/chef/orders/${orderId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
    }).catch((err) => console.error(err))
}
