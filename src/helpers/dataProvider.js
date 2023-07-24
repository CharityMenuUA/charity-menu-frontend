import normalizeUrl from 'normalize-url'

const BACKEND_API = process.env.BACKEND_API

export const dynamic = 'force-dynamic'

const createUrl = (path, options) => {
    const url = new URL(normalizeUrl(path))
    if (options?.params) {
        Object.keys(options.params).forEach((key) => {
            url.searchParams.set(key, options.params[key])
        })
    }
    return url.toString()
}
// get a list of records based on sort, filter, and pagination
export const getList = async (resource, options) => {
    const url = createUrl(`${BACKEND_API}/${resource}`, options)
    try {
        return await fetch(url, {
            next: {revalidate: 60},
            ...options,
        })
    } catch (err) {
        throw new Error(err.message)
    }
}

// get a list of records based on sort, filter, and pagination
export const get = async (resource, options) => {
    const url = createUrl(`${BACKEND_API}/${resource}`, options)

    try {
        return await fetch(url, {
            next: {revalidate: 60},
            ...options,
        })
    } catch (err) {
        throw new Error(err.message)
    }
}

export const create = async (resource, options) => {
    const url = createUrl(`${BACKEND_API}/${resource}`, options)
    options.headers = {...options.headers, "Content-Type": "application/json"}
    try {
        return await fetch(url, {
            method: 'POST',
            ...options,
            body: JSON.stringify(options.body),
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            }
        })
    } catch (err) {
        throw new Error(err.message)
    }
}

export const update = async (resource, options) => {
    const url = createUrl(`${BACKEND_API}/${resource}`, options)
    try {
        return await fetch(url, {
            method: 'PUT',
            ...options,
            body: JSON.stringify(options.body),
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            }
        })
    } catch (err) {
        throw new Error(err.message)
    }
}

// get a single record by id
export const getOne = async (resource, id, options) => {
    const url = createUrl(`${BACKEND_API}/${resource}/${id}`, options)
    try {
        return await fetch(url, {
            next: {revalidate: 60},
            ...options,
        })
    } catch (err) {
        throw new Error(err.message)
    }
}

const dataProvider = {
    get,
    getList,
    getOne,
    getMany: () => Promise, // get a list of records based on an array of ids
    getManyReference: () => Promise, // get the records referenced to another record, e.g. comments for a post
    create, // create a record
    update, // update a record based on a patch
    updateMany: () => Promise, // update a list of records based on an array of ids and a common patch
    delete: () => Promise, // delete a record by id
    deleteMany: () => Promise, // delete a list of records based on an array of ids
}

export default dataProvider
