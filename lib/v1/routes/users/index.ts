import { AppType, UserType } from '../..'
import { API, DELETE, GET, PATCH, POST } from '../../../api'
import { AppsResponse } from '../testflight/apps/types'
import {
    UserResponse,
    UsersResponse,
    UserUpdateRequest,
    UserVisibleAppsLinkagesRequest,
    UserVisibleAppsLinkagesResponse,
} from './types'

/**
 * Get a list of the users on your team.
 * @param query
 */
export function listUsers(
    api: API,
    query: ListUsersQuery
): Promise<UsersResponse> {
    return GET(api, '/users', { query })
}

/**
 * Get information about a user on your team, such as name, roles, and app visibility.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readUserInformation(
    api: API,
    id: string,
    query: ReadUserInformationQuery
): Promise<UserResponse> {
    return GET(api, `/users/${id}`, { query })
}

/**
 * Change a user's role, app visibility information, or other account details.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyUserAccount(
    api: API,
    id: string,
    body: UserUpdateRequest
): Promise<UserResponse> {
    return PATCH(api, `/users/${id}`, { body })
}

/**
 * Remove a user from your team.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function removeUserAccount(api: API, id: string): Promise<void> {
    return DELETE(api, `/users/${id}`)
}

/**
 * Get a list of apps that a user on your team can view.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllAppsVisibleToUser(
    api: API,
    id: string,
    query: ListAllAppsVisibleToUserQuery
): Promise<AppsResponse> {
    return GET(api, `/users/${id}/visibleApps`, { query })
}

/**
 * Get a list of app resource IDs to which a user on your team has access.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllVisibleAppResourceIDsForUser(
    api: API,
    id: string,
    query: GetAllVisibleAppResourceIDsForUserQuery
): Promise<UserVisibleAppsLinkagesResponse> {
    return GET(api, `/users/${id}/relationships/visibleApps`, { query })
}

/**
 * Give a user on your team access to one or more apps.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function addVisibleAppsToUser(
    api: API,
    id: string,
    body: UserVisibleAppsLinkagesRequest
): Promise<void> {
    return POST(api, `/users/${id}/relationships/visibleApps`, { body })
}

/**
 * Replace the list of apps a user on your team can see.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function replaceListOfVisibleAppsForUser(
    api: API,
    id: string,
    body: UserVisibleAppsLinkagesRequest
): Promise<void> {
    return PATCH(api, `/users/${id}/relationships/visibleApps`, { body })
}

/**
 * Remove a user on your team’s access to one or more apps.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function removeVisibleAppsFromUser(api: API, id: string): Promise<void> {
    return DELETE(api, `/users/${id}/relationships/visibleApps`)
}

interface ListUsersQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        users?: UserType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: string
    /**
     * Number of resources to return.
     */
    limit?: number
    /**
     * Attributes by which to sort.
     */
    sort?: ListUsersQuerySortOption[]
    filter?: {
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        roles?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        visibleApps?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        username?: string[]
    }
    limitField?: {
        /**
         * Number of included related resources to return.
         */
        visibleApps?: number
    }
}
type ListUsersQuerySortOption =
    | 'lastName'
    | '+lastName'
    | '-lastName'
    | 'username'
    | '+username'
    | '-username'

interface ReadUserInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        users?: UserType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: string
    limitField?: {
        /**
         * Number of included related resources to return.
         */
        visibleApps?: number
    }
}

interface ListAllAppsVisibleToUserQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps: AppType[]
    }
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface GetAllVisibleAppResourceIDsForUserQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}
