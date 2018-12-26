import { BuildBetaDetailType, BuildType } from '../../..'
import { API, GET, PATCH } from '../../../../api'
import { ResourceType } from '../../../data'
import { BuildResponse } from '../builds/types'
import {
    BuildBetaDetailBuildLinkageResponse,
    BuildBetaDetailResponse,
    BuildBetaDetailsResponse,
    BuildBetaDetailUpdateRequest,
} from './types'

/**
 * Find and list build beta details for all builds.
 * @param query
 */
export function listBuildBetaDetails(
    api: API,
    query: ListBuildBetaDetailsQuery
): Promise<BuildBetaDetailsResponse> {
    return GET(api, `/buildBetaDetails`, { query })
}

/**
 * Get a specific build beta details resource.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBuildBetaDetailInformation(
    api: API,
    id: string,
    query: ReadBuildBetaDetailInformationQuery
): Promise<BuildBetaDetailResponse> {
    return GET(api, `/buildBetaDetails/${id}`, { query })
}

/**
 * Get the build information for a specific build beta details resource.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBuildInformationForBuildBetaDetail(
    api: API,
    id: string,
    query: ReadBuildInformationForBuildBetaDetailQuery
): Promise<BuildResponse> {
    return GET(api, `/buildBetaDetails/${id}/build`, { query })
}

/**
 * Get the build resource ID for a specific build beta detail.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getBuildIDForBuildBetaDetail(
    api: API,
    id: string
): Promise<BuildBetaDetailBuildLinkageResponse> {
    return GET(api, `/buildBetaDetails/${id}/relationships/build`)
}

/**
 * Update beta test details for a specific build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyBuildBetaDetail(
    api: API,
    id: string,
    body: BuildBetaDetailUpdateRequest
): Promise<BuildBetaDetailResponse> {
    return PATCH(api, `/buildBetaDetails/${id}`, { body })
}

interface ListBuildBetaDetailsQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        buildBetaDetails?: BuildBetaDetailType[]
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
    }
    filter?: {
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        build?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        id?: string[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ResourceType<'build'>[]
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface ReadBuildBetaDetailInformationQuery {}

interface ReadBuildInformationForBuildBetaDetailQuery {}
