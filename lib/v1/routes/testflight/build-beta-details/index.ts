import v1, { BuildType, BuildBetaDetailType } from '../../..'
import {
    BuildBetaDetailsResponse,
    BuildBetaDetailResponse,
    BuildBetaDetailBuildLinkageResponse,
    BuildBetaDetailUpdateRequest,
} from './types'
import { ResourceType } from '../../../data'
import { BuildResponse } from '../builds/types'

/**
 * Find and list build beta details for all builds.
 * @param query
 */
export function listBuildBetaDetails(
    query: ListBuildBetaDetailsQuery
): Promise<BuildBetaDetailsResponse> {
    return v1.GET(`/buildBetaDetails`, { query })
}

/**
 * Get a specific build beta details resource.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBuildBetaDetailInformation(
    id: string,
    query: ReadBuildBetaDetailInformationQuery
): Promise<BuildBetaDetailResponse> {
    return v1.GET(`/buildBetaDetails/${id}`, { query })
}

/**
 * Get the build information for a specific build beta details resource.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBuildInformationForBuildBetaDetail(
    id: string,
    query: ReadBuildInformationForBuildBetaDetailQuery
): Promise<BuildResponse> {
    return v1.GET(`/buildBetaDetails/${id}/build`, { query })
}

/**
 * Get the build resource ID for a specific build beta detail.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getBuildIDForBuildBetaDetail(
    id: string
): Promise<BuildBetaDetailBuildLinkageResponse> {
    return v1.GET(`/buildBetaDetails/${id}/relationships/build`)
}

/**
 * Update beta test details for a specific build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyBuildBetaDetail(
    id: string,
    body: BuildBetaDetailUpdateRequest
): Promise<BuildBetaDetailResponse> {
    return v1.PATCH(`/buildBetaDetails/${id}`, { body })
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
