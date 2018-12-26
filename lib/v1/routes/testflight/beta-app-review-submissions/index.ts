import {
    BetaAppReviewSubmissionCreateRequest,
    BetaAppReviewSubmissionResponse,
    BetaAppReviewSubmissionsResponse,
    BetaAppReviewSubmissionBuildLinkageResponse,
} from './types'

import v1, { BuildType, BetaAppReviewSubmissionType } from '../../..'
import { ResourceType } from '../../../data'
import { BuildResponse } from '../builds/types'

/**
 * Submit an app for beta app review to allow external testing.
 * @param body
 */
export function submitAppForBetaReview(
    body: BetaAppReviewSubmissionCreateRequest
): Promise<BetaAppReviewSubmissionResponse> {
    return v1.POST(`/betaAppReviewSubmissions`, { body })
}

/**
 * Find and list beta app review submissions for all builds.
 * @param query
 */
export function listBetaAppReviewSubmissions(
    query: ListBetaAppReviewSubmissionsQuery
): Promise<BetaAppReviewSubmissionsResponse> {
    return v1.GET(`/betaAppReviewSubmissions`, { query })
}

/**
 * Get a specific beta app review submission.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaAppReviewSubmissionInformation(
    id: string,
    query: ReadBetaAppReviewSubmissionInformationQuery
): Promise<BetaAppReviewSubmissionResponse> {
    return v1.GET(`/betaAppReviewSubmissions/${id}`, { query })
}

/**
 * Get the build information for a specific beta app review submission.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBuildInformationForBetaAppReviewSubmission(
    id: string,
    query: ReadBuildInformationForBetaAppReviewSubmissionQuery
): Promise<BuildResponse> {
    return v1.GET(`/betaAppReviewSubmissions/${id}/build`, { query })
}

/**
 * Get the build resource ID associated with a specific beta app review submission.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getBuildIDForBetaAppReviewSubmission(
    id: string
): Promise<BetaAppReviewSubmissionBuildLinkageResponse> {
    return v1.GET(`/betaAppReviewSubmissions/${id}/relationships/build`)
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
