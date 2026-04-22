import normalizeUrl from 'normalize-url'

const BACKEND_API = process.env.BACKEND_API

export const dynamic = 'force-dynamic'

export class HttpError extends Error {
    constructor(response, url) {
        super(`HTTP ${response.status} ${response.statusText || ''} — ${url}`)
        this.name = 'HttpError'
        this.status = response.status
        this.url = url
    }
}

const createUrl = (path, options) => {
    const url = new URL(normalizeUrl(path))
    if (options?.params) {
        Object.keys(options.params).forEach((key) => {
            url.searchParams.set(key, options.params[key])
        })
    }
    return url.toString()
}

// Single fetch entrypoint: checks response.ok, logs with context, and rethrows
// so callers can react (error.js boundary on the server, .catch on the client).
// Previously every helper ended in .catch(console.error) which silently returned
// undefined and crashed destructuring callers.
const request = async (url, init) => {
    let response
    try {
        response = await fetch(url, init)
    } catch (err) {
        console.error(`[dataProvider] network error for ${init?.method || 'GET'} ${url}:`, err)
        throw err
    }
    if (!response.ok) {
        const err = new HttpError(response, url)
        console.error(`[dataProvider] ${err.message}`)
        throw err
    }
    return response.json()
}

export const getList = async (resource, options) => {
    const url = createUrl(`${BACKEND_API}/${resource}`, options)
    return request(url, options)
}

export const get = async (resource, options) => {
    const url = createUrl(`${BACKEND_API}/${resource}`, options)
    return request(url, options)
}

export const create = async (resource, options = {}) => {
    const url = createUrl(`${BACKEND_API}/${resource}`, options)
    return request(url, {
        ...options,
        method: 'POST',
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    })
}

export const update = async (resource, options = {}) => {
    const url = createUrl(`${BACKEND_API}/${resource}`, options)
    return request(url, {
        ...options,
        method: 'PUT',
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    })
}

export const getOne = async (resource, id, options) => {
    const url = createUrl(`${BACKEND_API}/${resource}/${id}`, options)
    return request(url, options)
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
