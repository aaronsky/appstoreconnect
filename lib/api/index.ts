import jwt from 'jsonwebtoken'
import qs from 'querystring'
import request from 'request'

export interface API {
    baseUrl: string
    token: Token | null
}

export function makeAPI(baseUrl: string, token?: Token): API {
    return { baseUrl, token: token || null }
}

export type Token = string

export function token(
    privateKey: jwt.Secret,
    issuerId: string,
    keyId: string
): Token {
    return jwt.sign({}, privateKey, {
        algorithm: 'ES256',
        keyid: keyId,
        audience: 'appstoreconnect-v1',
        expiresIn: 1200,
        issuer: issuerId,
    })
}

export function tokenAsync(
    privateKey: jwt.Secret,
    issuerId: string,
    keyId: string
): Promise<Token> {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {},
            privateKey,
            {
                algorithm: 'ES256',
                keyid: keyId,
                audience: 'appstoreconnect-v1',
                expiresIn: 1200,
                issuer: issuerId,
            },
            (err: Error, token: string) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(token)
            }
        )
    })
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
                qs: querystring(options.query),
                auth: api.token
                    ? {
                          bearer: api.token,
                      }
                    : undefined,
                body: options.body,
            },
            (error, _response, body) => {
                if (error) {
                    console.error(error)
                    reject(error)
                    return
                }
                body && console.log(body)
                resolve()
            }
        )
    })
}

function querystring(query: object | undefined): string {
    if (!query) {
        return ''
    }
    const queries = Object.entries(query).reduce(
        (accumulator, [key, value]) => {
            let insertions: object
            if (typeof value === 'object') {
                let rootKey = key
                if (key === 'limitField') {
                    rootKey = 'limit'
                }
                insertions = Object.entries(value).reduce(
                    (innerAcc, [innerKey, innerValue]) => ({
                        ...innerAcc,
                        [`${rootKey}[${innerKey}]`]: innerValue,
                    }),
                    {}
                )
            } else {
                insertions = { [key]: value }
            }
            return {
                ...accumulator,
                ...insertions,
            }
        },
        {}
    )
    return qs.stringify(queries)
}
