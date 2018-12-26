import { BetaAppReviewSubmissionType, BuildType } from '../../..'
import { API, GET, POST } from '../../../../api'
import { ResourceType } from '../../../data'
import { BuildResponse } from '../builds/types'
import {
    BetaAppReviewSubmissionBuildLinkageResponse,
    BetaAppReviewSubmissionCreateRequest,
    BetaAppReviewSubmissionResponse,
    BetaAppReviewSubmissionsResponse,
} from './types'

/**
 * Submit an app for beta app review to allow external testing.
 * @param body
 */
export function submitAppForBetaReview(
    api: API,
    body: BetaAppReviewSubmissionCreateRequest
): Promise<BetaAppReviewSubmissionResponse> {
    return POST(api, `/betaAppReviewSubmissions`, { body })
}

/**
 * Find and list beta app review submissions for all builds.
 * @param query
 */
export function listBetaAppReviewSubmissions(
    api: API,
    query: ListBetaAppReviewSubmissionsQuery
): Promise<BetaAppReviewSubmissionsResponse> {
    return GET(api, `/betaAppReviewSubmissions`, { query })
}

/**
 * Get a specific beta app review submission.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaAppReviewSubmissionInformation(
    api: API,
    id: string,
    query: ReadBetaAppReviewSubmissionInformationQuery
): Promise<BetaAppReviewSubmissionResponse> {
    return GET(api, `/betaAppReviewSubmissions/${id}`, { query })
}

/**
 * Get the build information for a specific beta app review submission.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBuildInformationForBetaAppReviewSubmission(
    api: API,
    id: string,
    query: ReadBuildInformationForBetaAppReviewSubmissionQuery
): Promise<BuildResponse> {
    return GET(api, `/betaAppReviewSubmissions/${id}/build`, { query })
}

/**
 * Get the build resource ID associated with a specific beta app review submission.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getBuildIDForBetaAppReviewSubmission(
    api: API,
    id: string
): Promise<BetaAppReviewSubmissionBuildLinkageResponse> {
    return GET(api, `/betaAppReviewSubmissions/${id}/relationships/build`)
}

interface ListBetaAppReviewSubmissionsQuery {
    fields?: {
        betaAppReviewSubmissions?: BetaAppReviewSubmissionType[]
        builds?: BuildType[]
    }
    filter?: {
        betaReviewState?: string[]
        build?: string[]
    }
    include?: ResourceType<'build'>
    limit?: number
}

interface ReadBetaAppReviewSubmissionInformationQuery {
    fields?: {
        betaAppReviewSubmissions?: BetaAppReviewSubmissionType[]
        builds?: BuildType[]
    }
    include?: ResourceType<'build'>
}

interface ReadBuildInformationForBetaAppReviewSubmissionQuery {
    fields?: {
        builds?: BuildType[]
    }
}
