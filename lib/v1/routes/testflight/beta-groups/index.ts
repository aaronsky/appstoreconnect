import v1, { AppType, BetaGroupType, BetaTesterType, BuildType } from '../../..'
import {
    BetaGroupCreateRequest,
    BetaGroupResponse,
    BetaGroupUpdateRequest,
    BetaGroupsResponse,
    BetaGroupAppLinkageResponse,
    BetaGroupBetaTestersLinkagesRequest,
    BetaGroupBuildsLinkagesRequest,
    BetaGroupBuildsLinkagesResponse,
    BetaGroupBetaTestersLinkagesResponse,
} from './types'
import { AppResponse } from '../apps/types'
import { BuildsResponse } from '../builds/types'
import { BetaTestersResponse } from '../beta-testers/types'

/**
 * Create a beta group associated with an app, optionally enabling TestFlight public links.
 * @param body
 */
export function createBetaGroup(
    body: BetaGroupCreateRequest
): Promise<BetaGroupResponse> {
    return v1.POST(`/betaGroups`, { body })
}

/**
 * Modify a beta group's metadata, including changing its Testflight public link status.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyBetaGroup(
    id: string,
    body: BetaGroupUpdateRequest
): Promise<BetaGroupResponse> {
    return v1.PATCH(`/betaGroups/${id}`, { body })
}

/**
 * Delete a beta group and remove beta tester access to associated builds.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function deleteBetaGroup(id: string): Promise<void> {
    return v1.DELETE(`/betaGroups/${id}`)
}

/**
 * Find and list beta groups for all apps.
 * @param query
 */
export function listBetaGroups(
    query: ListBetaGroupsQuery
): Promise<BetaGroupsResponse> {
    return v1.GET(`/betaGroups`, { query })
}

/**
 * Get a specific beta group.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaGroupInformation(
    id: string,
    query: ReadBetaGroupInformationQuery
): Promise<BetaGroupResponse> {
    return v1.GET(`/betaGroups/${id}`, { query })
}

/**
 * Get the app information for a specific beta group.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppInformationForBetaGroup(
    id: string,
    query: ReadAppInformationForBetaGroupQuery
): Promise<AppResponse> {
    return v1.GET(`/betaGroups/${id}/app`, { query })
}

/**
 * Get the app resource ID for a specific beta group.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getAppResourceIDForBetaGroup(
    id: string
): Promise<BetaGroupAppLinkageResponse> {
    return v1.GET(`/betaGroups/${id}/relationships/app`)
}

/**
 * Add a specific beta tester to one or more beta groups for beta testing.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function addBetaTestersToBetaGroup(
    id: string,
    body: BetaGroupBetaTestersLinkagesRequest
): Promise<void> {
    return v1.POST(`/betaGroups/${id}/relationships/betaTesters`, { body })
}

/**
 * Remove a specific beta tester from a one or more beta groups, revoking their access to test builds associated with those groups.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function removeBetaTestersFromBetaGroup(
    id: string,
    body: BetaGroupBetaTestersLinkagesRequest
): Promise<void> {
    return v1.DELETE(`/betaGroups/${id}/relationships/betaTesters`, { body })
}

/**
 * Associate builds with a beta group to enable the group to test the builds.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function addBuildsToBetaGroup(
    id: string,
    body: BetaGroupBuildsLinkagesRequest
): Promise<void> {
    return v1.POST(`/betaGroups/${id}/relationships/builds`, { body })
}

/**
 * Remove access to test one or more builds from beta testers in a specific beta group.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function removeBuildsFromBetaGroup(
    id: string,
    body: BetaGroupBuildsLinkagesRequest
): Promise<void> {
    return v1.DELETE(`/betaGroups/${id}/relationships/builds`, { body })
}

/**
 * Get a list of builds associated with a specific beta group.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllBuildsForBetaGroup(
    id: string,
    query: ListAllBuildsForBetaGroupQuery
): Promise<BuildsResponse> {
    return v1.GET(`/betaGroups/${id}/builds`, { query })
}

/**
 * Get a list of build resource IDs in a specific beta group.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllBuildIDsForBetaGroup(
    id: string,
    query: GetAllBuildIDsForBetaGroupQuery
): Promise<BetaGroupBuildsLinkagesResponse> {
    return v1.GET(`/betaGroups/${id}/relationships/builds`, { query })
}

/**
 * Get a list of beta testers contained in a specific beta group.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllBetaTestersForBetaGroup(
    id: string,
    query: ListAllBetaTestersForBetaGroupQuery
): Promise<BetaTestersResponse> {
    return v1.GET(`/betaGroups/${id}/betaTesters`, { query })
}

/**
 * Get a list of the beta tester resource IDs in a specific beta group.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllBetaTesterIDsForBetaGroup(
    id: string,
    query: GetAllBetaTesterIDsForBetaGroupQuery
): Promise<BetaGroupBetaTestersLinkagesResponse> {
    return v1.GET(`/betaGroups/${id}/relationships/betaTesters`, { query })
}

interface ListBetaGroupsQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaGroups: BetaGroupType[]
        /**
         * Fields to return for included related types.
         */
        betaTesters: BetaTesterType[]
        /**
         * Fields to return for included related types.
         */
        builds: BuildType[]
    }
    filter?: {
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        app?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        builds?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        id?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        isInternalGroup?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        name?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        publicLinkEnabled?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        publicLinkLimitEnabled?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        publicLink?: string[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ('app' | 'betaTesters' | 'builds')[]
    /**
     * Number of resources to return.
     */
    limit?: number
    limitField?: {
        /**
         * Number of included related resources to return.
         */
        betaTesters?: number
        /**
         * Number of included related resources to return.
         */
        builds?: number
    }
    /**
     * Attributes by which to sort.
     */
    sort?: 'createdDate, +createdDate, -createdDate, name, +name, -name, publicLinkEnabled, +publicLinkEnabled, -publicLinkEnabled, publicLinkLimit, +publicLinkLimit, -publicLinkLimit'
}

interface ReadBetaGroupInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaGroups?: BetaGroupType[]
        /**
         * Fields to return for included related types.
         */
        betaTesters?: BetaTesterType[]
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ('app' | 'betaTesters' | 'builds')[]
    limitField?: {
        /**
         * Number of included related resources to return.
         */
        builds?: number
        /**
         * Number of included related resources to return.
         */
        betaTesters?: number
    }
}

interface ReadAppInformationForBetaGroupQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
    }
}

interface ListAllBuildsForBetaGroupQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
    }
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface GetAllBuildIDsForBetaGroupQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface ListAllBetaTestersForBetaGroupQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        betaTesters?: BetaTesterType[]
    }
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface GetAllBetaTesterIDsForBetaGroupQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}
