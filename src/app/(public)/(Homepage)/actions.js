'use server'

import {getList} from "@/helpers/dataProvider"

export const getAccumulated = async () => {
    return getList(`/chefs/accumulated`)
}