'use server'

import {create, update, get} from "@/helpers/dataProvider"

export const setProfile = async (accessToken, data) => {
    try {
        return await create(`/profile`, {
            body: JSON.stringify(data),
            cache: 'no-store',
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
            cache: 'no-store',
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
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            cache: 'no-store',
            next: {revalidate: 0,}
        }).then(data => data.json())
    } catch (err) {
        return {}
    }
}
