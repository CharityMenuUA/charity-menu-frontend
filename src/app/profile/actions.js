'use server'

import {create, update, get} from "@/helpers/dataProvider"

export const setProfile = async (accessToken, data) => {
    try {
        return await create(`/profile`, {
            body: data,
            // cache: 'no-store',
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }).then(data => data.json())
    } catch {
        return {}
    }
}


export const updateProfile = async (accessToken, data) => {
    try {
        return await update(`/profile`, {
            body: data,
            // cache: 'no-store',
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }).then(data => data.json())
    } catch {
        return {}
    }
}

export const getProfile = async (accessToken) => {
    try {
        return await get(`/profile`, {
            // cache: 'no-store',
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }).then(data => data.json())
    } catch (err) {
        return {}
    }
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
        }).then(data => data.json())
        const completed = await get(`/profile/orders`, {
            params: {
                state: "COMPLETED"
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }).then(data => data.json())
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
        }).then(data => data.json())
        const completed = await get(`/profile/chef/orders`, {
            params: {
                state: "COMPLETED"
            },
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }).then(data => data.json())
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

export const setCompleted = async (accessToken, orderId) => {
    try {
        return await create(`/profile/chef/orders/${orderId}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
        }).then(data => data.json())
    } catch {
        return {}
    }
}
