import v1 from '../../'
import {
    UsersResponse,
    UserResponse,
    UserUpdateRequest,
    UserVisibleAppsLinkagesRequest,
    UserVisibleAppsLinkagesResponse,
} from './types'
import { AppType, UserType } from '../..'
import { AppsResponse } from '../testflight/apps/types'

/**
 * Get a list of the users on your team.
 * @param query
 */
export function listUsers(query: ListUsersQuery): Promise<UsersResponse> {
    return v1.GET('/users', { query })
}

/**
 * Get information about a user on your team, such as name, roles, and app visibility.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readUserInformation(
    id: string,
    query: ReadUserInformationQuery
): Promise<UserResponse> {
    return v1.GET(`/users/${id}`, { query })
}

/**
 * Change a user's role, app visibility information, or other account details.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyUserAccount(
    id: string,
    body: UserUpdateRequest
): Promise<UserResponse> {
    return v1.PATCH(`/users/${id}`, { body })
}

/**
 * Remove a user from your team.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function removeUserAccount(id: string): Promise<void> {
    return v1.DELETE(`/users/${id}`)
}

/**
 * Get a list of apps that a user on your team can view.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllAppsVisibleToUser(
    id: string,
    query: ListAllAppsVisibleToUserQuery
): Promise<AppsResponse> {
    return v1.GET(`/users/${id}/visibleApps`, { query })
}

/**
 * Get a list of app resource IDs to which a user on your team has access.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllVisibleAppResourceIDsForUser(
    id: string,
    query: GetAllVisibleAppResourceIDsForUserQuery
): Promise<UserVisibleAppsLinkagesResponse> {
    return v1.GET(`/users/${id}/relationships/visibleApps`, { query })
}

/**
 * Give a user on your team access to one or more apps.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function addVisibleAppsToUser(
    id: string,
    body: UserVisibleAppsLinkagesRequest
): Promise<void> {
    return v1.POST(`/users/${id}/relationships/visibleApps`, { body })
}

/**
 * Replace the list of apps a user on your team can see.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function replaceListOfVisibleAppsForUser(
    id: string,
    body: UserVisibleAppsLinkagesRequest
): Promise<void> {
    return v1.PATCH(`/users/${id}/relationships/visibleApps`, { body })
}

/**
 * Remove a user on your team’s access to one or more apps.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function removeVisibleAppsFromUser(id: string): Promise<void> {
    return v1.DELETE(`/users/${id}/relationships/visibleApps`)
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
