import got from 'got'
import { DateTime } from 'luxon'
import qs from 'qs'
import { URL } from 'url'
import { ErrorResponse } from '../v1/error'
import { OutgoingHttpHeaders } from 'http'
import zlib from 'zlib'

export interface API {
    baseUrl: string
    token: string | null
}

export function makeAPI(baseUrl: string, token?: string): API {
    return { baseUrl, token: token || null }
}

export class APIError extends Error {
    readonly response: ErrorResponse

    constructor(response: ErrorResponse, code?: number, message?: string) {
        super(`${code} ${message}`)
        this.response = response
    }
}

export enum ContentType {
    JSON = 'application/json',
    GZIP = 'application/a-gzip',
}

interface APIOptions {
    query?: object
    body?: object
    contentType?: ContentType
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

async function call<T>(
    api: API,
    path: string,
    method: string,
    options: APIOptions = {}
): Promise<T> {
    let rawResponse
    try {
        rawResponse = await got(path, {
            baseUrl: api.baseUrl,
            method,
            headers: headers(api.token, options.contentType),
            query: query(options.query),
            body: body(options.body),
        })
    } catch (error) {
        throw new Error(error.response.body)
    }

    const { body: responseBody, ...response } = rawResponse

    if (!body) {
        return (undefined as unknown) as T
    } else if (options.contentType === ContentType.GZIP) {
        return (body as unknown) as T
    } else {
        return json(responseBody, response)
    }
}

function headers(
    token: string | null,
    contentType: ContentType = ContentType.JSON
): OutgoingHttpHeaders {
    const defaultHeaders: OutgoingHttpHeaders = {
        'content-type': contentType,
    }
    let headers = defaultHeaders
    if (token) {
        headers = {
            ...headers,
            authorization: `Bearer ${token}`,
        }
    }
    return headers
}

function json(
    body: any,
    response: { statusCode?: number; statusMessage?: string }
) {
    let json
    try {
        json = JSON.parse(body, jsonParser)
    } catch (jsonError) {
        throw jsonError
    }

    if (json.errors && Array.isArray(json.errors)) {
        throw new APIError(json, response.statusCode, response.statusMessage)
    }

    return json
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

function query(object: object | undefined): string | undefined {
    if (object === undefined) {
        return
    }
    return qs.stringify(sanitize(object), {
        arrayFormat: 'repeat',
        encodeValuesOnly: true,
    })
}

function sanitize(object: object): object {
    if (isObject(object)) {
        if (Array.isArray(object)) {
            object = object.map(sanitize)
        } else if (isDateTime(object)) {
            object = (object as any).toISO()
        } else if (isURL(object)) {
            object = (object as any).href
        } else {
            object = Object.entries(object).reduce(
                (acc, [key, value]) => ({ ...acc, [key]: sanitize(value) }),
                {}
            )
        }
    }
    return object
}

function body(object: object | undefined): string | undefined {
    if (object === undefined) {
        return
    }
    const json = JSON.stringify(object)
    console.log(json)
    return json
}
