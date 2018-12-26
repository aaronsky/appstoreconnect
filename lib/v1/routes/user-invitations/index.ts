import v1 from '../../'
import {
    UserInvitationsResponse,
    UserInvitationResponse,
    UserInvitationCreateRequest,
    UserInvitationVisibleAppsLinkagesResponse,
} from './types'
import { AppType, UserType } from '../..'
import { AppsResponse } from '../testflight/apps/types'

/**
 * Get a list of pending invitations to join your team.
 * @param query
 */
export function listInvitedUsers(
    query: ListInvitedUsersQuery
): Promise<UserInvitationsResponse> {
    return v1.GET('/userInvitations', { query })
}

/**
 * Get information about a pending invitation to join your team.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readUserInvitationInformation(
    id: string,
    query: ReadUserInvitationInformationQuery
): Promise<UserInvitationResponse> {
    return v1.GET(`/userInvitations/${id}`, { query })
}

/**
 * Invite a user with assigned user roles to join your team.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function inviteUser(
    id: string,
    body: UserInvitationCreateRequest
): Promise<UserInvitationResponse> {
    return v1.POST(`/userInvitations/${id}`, { body })
}

/**
 * Cancel a pending invitation for a user to join your team.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function cancelUserInvitation(id: string): Promise<void> {
    return v1.DELETE(`/userInvitations/${id}`)
}

/**
 * Get a list of apps that will be visible to a user with a pending invitation.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllAppsVisibleToInvitedUser(
    id: string,
    query: ListAllAppsVisibleToInvitedUserQuery
): Promise<AppsResponse> {
    return v1.GET(`/userInvitations/${id}/visibleApps`, { query })
}

/**
 * Get a list of apps that will be visible to a user with a pending invitation.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllAppResourceIDsVisibleToInvitedUser(
    id: string,
    query: GetAllAppResourceIDsVisibleToInvitedUserQuery
): Promise<UserInvitationVisibleAppsLinkagesResponse> {
    return v1.GET(`/userInvitations/${id}/relationships/visibleApps`, {
        query,
    })
}

interface ListInvitedUsersQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        userInvitations?: UserType[]
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
    sort?: ListInvitedUsersQuerySortOption[]
    filter?: {
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        roles?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        email?: string[]
        /**
         * Number of included related resources to return.
         */
        visibleApps?: string[]
    }
    limitField?: {
        /**
         * Number of included related resources to return.
         */
        visibleApps?: number
    }
}

type ListInvitedUsersQuerySortOption =
    | 'email'
    | '+email'
    | '-email'
    | 'lastName'
    | '+lastName'
    | '-lastName'

interface ReadUserInvitationInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        userInvitations?: UserType[]
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

interface ListAllAppsVisibleToInvitedUserQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
    }
}

interface GetAllAppResourceIDsVisibleToInvitedUserQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}
