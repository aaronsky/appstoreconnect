import { AppType, BuildType, PreReleaseVersionType } from '../../..'
import { API, GET } from '../../../../api'
import { AppResponse } from '../apps/types'
import { BuildsResponse, ProcessingState } from '../builds/types'
import {
    PrereleaseVersionAppLinkageResponse,
    PrereleaseVersionBuildsLinkagesResponse,
    PrereleaseVersionResponse,
    PreReleaseVersionsResponse,
} from './types'

/**
 * Get a list of prerelease versions for all apps.
 * @param query
 */
export function listPrereleaseVersions(
    api: API,
    query: ListPrereleaseVersionsQuery
): Promise<PreReleaseVersionsResponse> {
    return GET(api, `/preReleaseVersions`, { query })
}

/**
 * Get information about a specific prerelease version.
 * @param id
 * @param query
 */
export function readPrereleaseVersionInformation(
    api: API,
    id: string,
    query: ReadPrereleaseVersionInformationQuery
): Promise<PrereleaseVersionResponse> {
    return GET(api, `/preReleaseVersions/${id}`, { query })
}

/**
 * Get the app information for a specific prerelease version.
 * @param id
 * @param query
 */
export function readAppInformationForPrereleaseVersion(
    api: API,
    id: string,
    query: ReadAppInformationForPrereleaseVersionQuery
): Promise<AppResponse> {
    return GET(api, `/preReleaseVersions/${id}/app`, { query })
}

/**
 * Get the app resource ID associated with a specific prerelease version.
 * @param id
 */
export function getAppResourceIDForPrereleaseVersion(
    api: API,
    id: string
): Promise<PrereleaseVersionAppLinkageResponse> {
    return GET(api, `/preReleaseVersions/${id}/relationships/app`)
}

/**
 * Get a list of builds of a specific prerelease version.
 * @param id
 * @param query
 */
export function listAllBuildsForPrereleaseVersion(
    api: API,
    id: string,
    query: ListAllBuildsForPrereleaseVersionQuery
): Promise<BuildsResponse> {
    return GET(api, `/preReleaseVersions/${id}/builds`, { query })
}

/**
 * Get a list of build resource IDs associated with a provided prerelease version.
 * @param id
 * @param query
 */
export function getAllBuildIDsForPrereleaseVersion(
    api: API,
    id: string,
    query: GetAllBuildIDsForPrereleaseVersionQuery
): Promise<PrereleaseVersionBuildsLinkagesResponse> {
    return GET(api, `/preReleaseVersions/${id}/relationships/builds`, { query })
}

interface ListPrereleaseVersionsQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
        /**
         * Fields to return for included related types.
         */
        preReleaseVersions?: PreReleaseVersionType[]
    }
    filter?: {
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        app?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        builds: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        'builds.expired': string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        'builds.processingState': ProcessingState[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        platform: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        version: string[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ('app' | 'builds')[]
    /**
     * Number of resources to return.
     */
    limit?: number
    /**
     * Attributes by which to sort.
     */
    sort?: ('version' | '+version' | '-version')[]
    limitField?: {
        /**
         * Number of included related resources to return.
         */
        builds?: number
    }
}

interface ReadPrereleaseVersionInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
        /**
         * Fields to return for included related types.
         */
        preReleaseVersions?: PreReleaseVersionType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ('apps' | 'builds')[]
    limitField?: {
        /**
         * Number of included related resources to return.
         */
        builds?: number
    }
}

interface ReadAppInformationForPrereleaseVersionQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
    }
}

interface ListAllBuildsForPrereleaseVersionQuery {
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

interface GetAllBuildIDsForPrereleaseVersionQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}
