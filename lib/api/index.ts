import { DateTime } from 'luxon'
import request from 'request'
import { URL } from 'url'
import { ErrorResponse } from '../v1/error'

export interface API {
    baseUrl: string
    token: string | null
}

export function makeAPI(baseUrl: string, token?: string): API {
    return { baseUrl, token: token || null }
}

export class APIError extends Error {
    readonly response: ErrorResponse

    constructor(code: number, message: string, response: ErrorResponse) {
        super(`${code} ${message}`)
        this.response = response
    }
}

interface APIOptions {
    query?: object
    body?: object
}

export function HEAD<T>(
    api: API,
    path: string,
    options: APIOptions = {}
): Promise<T> {
    return call(api, path, 'HEAD', options)
}
export function GET<T>(
    api: API,
    path: string,
    options: APIOptions = {}
): Promise<T> {
    return call(api, path, 'GET', options)
}
export function POST<T>(
    api: API,
    path: string,
    options: APIOptions = {}
): Promise<T> {
    return call(api, path, 'POST', options)
}
export function PUT<T>(
    api: API,
    path: string,
    options: APIOptions = {}
): Promise<T> {
    return call(api, path, 'PUT', options)
}
export function PATCH<T>(
    api: API,
    path: string,
    options: APIOptions = {}
): Promise<T> {
    return call(api, path, 'PATCH', options)
}
export function DELETE<T>(
    api: API,
    path: string,
    options: APIOptions = {}
): Promise<T> {
    return call(api, path, 'DELETE', options)
}

function call<T>(
    api: API,
    path: string,
    method: string,
    options: APIOptions = {}
): Promise<T> {
    return new Promise((resolve, reject) => {
        request(
            path,
            {
                baseUrl: api.baseUrl,
                method,
                qs: sanitizeJSON(options.query),
                qsStringifyOptions: {
                    indices: false,
                    encodeValuesOnly: true,
                },
                auth: api.token
                    ? {
                          bearer: api.token,
                      }
                    : undefined,
                body: options.body,
            },
            (_error, response, body) => {
                if (!body) {
                    resolve()
                    return
                } else if (typeof body !== 'string') {
                    resolve(body)
                    return
                }
                let json
                try {
                    json = JSON.parse(body, jsonParser)
                } catch (jsonError) {
                    reject(jsonError)
                    return
                }
                if (json.errors && Array.isArray(json.errors)) {
                    const apiError = new APIError(
                        response.statusCode,
                        response.statusMessage,
                        json
                    )
                    reject(apiError)
                    return
                }
                resolve(json)
            }
        )
    })
}

function jsonParser(_key: any, value: any) {
    if (typeof value === 'string') {
        const url = urlStringToURL(value)
        if (url) {
            return url
        }

        const date = dateStringToDate(value)
        if (date) {
            return date
        }
    }
    return value
}

function urlStringToURL(value: string): URL | undefined {
    try {
        const url = new URL(value)
        if (url) {
            return url
        }
    } catch {}
}

function dateStringToDate(value: string): DateTime | undefined {
    const date = DateTime.fromISO(value)
    if (date.isValid) {
        return date
    }
}

const isObject = (value: any) => typeof value === 'object' && value !== null
const isDateTime = (value: any) => (value && value.isLuxonDateTime) || false
const isURL = (value: any) =>
    (value && value.href && typeof value.href === 'string') || false

function sanitizeJSON(object: object | undefined): object | undefined {
    if (object === undefined) {
        return
    }
    if (isObject(object)) {
        if (Array.isArray(object)) {
            object = object.map(sanitizeJSON)
        } else if (isDateTime(object)) {
            object = (object as any).toISO()
        } else if (isURL(object)) {
            object = (object as any).href
        } else {
            object = Object.entries(object).reduce(
                (acc, [key, value]) => ({ ...acc, [key]: sanitizeJSON(value) }),
                {}
            )
        }
    }
    return object
}
