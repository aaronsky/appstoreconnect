import request from 'request'
import qs from 'querystring'
import jwt from 'jsonwebtoken'

interface ApiOptions {
    query?: object
    body?: object
}

interface Routeable {
    [key: string]: any
}

export class API implements Routeable {
    [key: string]: any

    private readonly baseURL: string
    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    generateToken(
        privateKey: jwt.Secret,
        issuerId: string,
        keyId: string
    ): Promise<string> {
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

    routes(groupName: string, routes: Routeable) {
        this[groupName] = routes
    }

    HEAD<T>(path: string, options: ApiOptions = {}): Promise<T> {
        return this.call(this.baseURL, path, 'HEAD', options)
    }
    GET<T>(path: string, options: ApiOptions = {}): Promise<T> {
        return this.call(this.baseURL, path, 'GET', options)
    }
    POST<T>(path: string, options: ApiOptions = {}): Promise<T> {
        return this.call(this.baseURL, path, 'POST', options)
    }
    PUT<T>(path: string, options: ApiOptions = {}): Promise<T> {
        return this.call(this.baseURL, path, 'PUT', options)
    }
    PATCH<T>(path: string, options: ApiOptions = {}): Promise<T> {
        return this.call(this.baseURL, path, 'PATCH', options)
    }
    DELETE<T>(path: string, options: ApiOptions = {}): Promise<T> {
        return this.call(this.baseURL, path, 'DELETE', options)
    }

    private call<T>(
        baseUrl: string,
        path: string,
        method: string,
        options: ApiOptions = {}
    ): Promise<T> {
        const query = querystring(options.query)
        console.debug('*** [DEBUG] querystring:', query)
        return new Promise((resolve, reject) => {
            request(
                path,
                {
                    baseUrl,
                    method,
                    qs: query,
                    body: options.body,
                },
                (error, response, body) => {
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

type ApplyRoutesFn = (api: API) => void
export function makeAPI(
    baseURL: string,
    applyRoutes: ApplyRoutesFn = () => {}
): API {
    let api = new API(baseURL)
    applyRoutes(api)
    return api
}
