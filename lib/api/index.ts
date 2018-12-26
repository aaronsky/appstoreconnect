import request from 'request'

interface ApiOptions {
    [key: string]: any
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
        return new Promise((resolve, reject) => {
            request(
                path,
                {
                    baseUrl,
                    method,
                    qs: '',
                },
                (error, response, body) => {
                    resolve()
                }
            )
        })
    }
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
