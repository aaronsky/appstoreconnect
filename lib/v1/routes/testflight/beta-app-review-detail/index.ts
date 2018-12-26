import v1, { BetaAppReviewDetailType, AppType } from '../../..'
import { ResourceType } from '../../../data'
import {
    BetaAppReviewDetailsResponse,
    BetaAppReviewDetailResponse,
    BetaAppReviewDetailAppLinkageResponse,
    BetaAppReviewDetailUpdateRequest,
} from './types'
import { AppResponse } from '../apps/types'

/**
 * Find and list beta app review details for all apps.
 * @param query
 */
export function listBetaAppReviewDetails(
    query: ListBetaAppReviewDetailsQuery
): Promise<BetaAppReviewDetailsResponse> {
    return v1.GET('/betaAppReviewDetails', { query })
}

/**
 * Find and list beta app review details for all apps.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaAppReviewDetailInformation(
    id: string,
    query: ReadBetaAppReviewDetailInformationQuery
): Promise<BetaAppReviewDetailResponse> {
    return v1.GET(`/betaAppReviewDetails/${id}`, { query })
}

/**
 * Get the app information for a specific beta app review details resource.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppInformationForBetaAppReviewDetail(
    id: string,
    query: ReadAppInformationForBetaAppReviewDetailQuery
): Promise<AppResponse> {
    return v1.GET(`/betaAppReviewDetails/${id}/app`, { query })
}

/**
 * Get the app resource ID associated with an app review detail.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getAppResourceIDForBetaAppReviewDetailsResource(
    id: string
): Promise<BetaAppReviewDetailAppLinkageResponse> {
    return v1.GET(`/betaAppReviewDetails/${id}/relationships/app`)
}

/**
 * Update the details for a specific app's beta app review.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyBetaAppReviewDetail(
    id: string,
    body: BetaAppReviewDetailUpdateRequest
): Promise<BetaAppReviewDetailResponse> {
    return v1.PATCH(`/betaAppReviewDetails/${id}`, { body })
}

interface ListBetaAppReviewDetailsQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaAppReviewDetails?: BetaAppReviewDetailType[]
    }
    filter: {
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        app: string[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ResourceType<'app'>[]
    /**
     * Number of resources to return.
     */
    limit: number
}

interface ReadBetaAppReviewDetailInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaAppReviewDetails?: BetaAppReviewDetailType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ResourceType<'app'>[]
}

interface ReadAppInformationForBetaAppReviewDetailQuery {
    fields?: {
        apps?: AppType[]
    }
}
