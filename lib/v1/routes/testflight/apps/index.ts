import v1, {
    BetaLicenseAgreementType,
    PreReleaseVersionType,
    BetaAppReviewDetailType,
    BetaAppLocalizationType,
    BuildType,
    BetaGroupType,
} from '../../../'
import {
    AppsResponse,
    AppResponse,
    AppBetaTestersLinkagesRequest,
    AppBetaGroupsLinkagesResponse,
    AppBuildsLinkagesResponse,
    AppPreReleaseVersionsLinkagesResponse,
    AppBetaLicenseAgreementLinkageResponse,
} from './types'
import { AppType } from '../../..'
import { BuildsResponse } from '../builds/types'
import {
    BetaAppReviewDetailResponse,
    AppBetaAppReviewDetailLinkageResponse,
} from '../beta-app-review-detail/types'
import { BetaGroupsResponse } from '../beta-groups/types'
import { PreReleaseVersionsResponse } from '../prerelease-versions/types'
import { BetaLicenseAgreementResponse } from '../beta-license-agreements/types'
import {
    BetaAppLocalizationsResponse,
    AppBetaAppLocalizationsLinkagesResponse,
} from '../beta-app-localizations/types'

/**
 * Find and list apps added in App Store Connect.
 * @param query
 */
export function listApps(query: ListAppsQuery): Promise<AppsResponse> {
    return v1.GET('/apps', { query })
}

/**
 * Get information about a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppInformation(
    id: string,
    query: ReadAppInformationQuery
): Promise<AppResponse> {
    return v1.GET(`/apps/${id}`, { query })
}

/**
 * Remove one or more beta testers' access to test any builds of a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function removeBetaTestersFromAllGroupsAndAppBuilds(
    id: string,
    body: AppBetaTestersLinkagesRequest
): Promise<void> {
    return v1.DELETE(`/apps/${id}/relationships/betaTesters`, { body })
}

/**
 * Get a list of beta groups associated with a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllBetaGroupsForApp(
    id: string,
    query: ListAllBetaGroupsForAppQuery
): Promise<BetaGroupsResponse> {
    return v1.GET(`/apps/${id}/betaGroups`, { query })
}

/**
 * Get a list of the beta group resource IDs associated with a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllBetaGroupIDsForApp(
    id: string,
    query: GetAllBetaGroupIDsForAppQuery
): Promise<AppBetaGroupsLinkagesResponse> {
    return v1.GET(`/apps/${id}/relationships/betaGroups`, { query })
}

/**
 * Get a list of builds associated with a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllBuildsForApp(
    id: string,
    query: ListAllBuildsForAppQuery
): Promise<BuildsResponse> {
    return v1.GET(`/apps/${id}/builds`, { query })
}

/**
 * Get a list of build resource IDs associated with a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllBuildIDsForApp(
    id: string,
    query: GetAllBuildIDsForAppQuery
): Promise<AppBuildsLinkagesResponse> {
    return v1.GET(`/apps/${id}/relationships/builds`, { query })
}

/**
 * Get a list of prerelease versions associated with a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllPrereleaseVersionsForApp(
    id: string,
    query: ListAllPrereleaseVersionsForAppQuery
): Promise<PreReleaseVersionsResponse> {
    return v1.GET(`/apps/${id}/preReleaseVersions`, { query })
}

/**
 * Get a list of prerelease version IDs for a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllPrereleaseVersionIDsForApp(
    id: string,
    query: GetAllPrereleaseVersionIDsForAppQuery
): Promise<AppPreReleaseVersionsLinkagesResponse> {
    return v1.GET(`/apps/${id}/relationships/preReleaseVersions`, { query })
}

/**
 * Get the beta app review details for a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaAppReviewDetailsResourceForApp(
    id: string,
    query: ReadBetaAppReviewDetailsResourceForAppQuery
): Promise<BetaAppReviewDetailResponse> {
    return v1.GET(`/apps/${id}/betaAppReviewDetail`, { query })
}

/**
 * Get the beta app review details resource ID associated with a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getBetaAppReviewDetailsResourceIDForApp(
    id: string
): Promise<AppBetaAppReviewDetailLinkageResponse> {
    return v1.GET(`/apps/${id}/relationships/betaAppReviewDetail`)
}

/**
 * Get the beta license agreement for a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaLicenseAgreementForApp(
    id: string,
    query: ReadBetaLicenseAgreementForAppQuery
): Promise<BetaLicenseAgreementResponse> {
    return v1.GET(`/apps/${id}/betaLicenseAgreement`, { query })
}

/**
 * Get the beta app review details resource ID associated with a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getBetaLicenseAgreementIDForApp(
    id: string
): Promise<AppBetaLicenseAgreementLinkageResponse> {
    return v1.GET(`/apps/${id}/relationships/betaLicenseAgreement`)
}

/**
 * Get a list of localized beta test information for a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllBetaAppLocalizationsForApp(
    id: string,
    query: ListAllBetaAppLocalizationsForAppQuery
): Promise<BetaAppLocalizationsResponse> {
    return v1.GET(`/apps/${id}/betaAppLocalizations`, { query })
}

/**
 * Get a list of beta app localization resource IDs associated with a specific app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllBetaAppLocalizationIDsForApp(
    id: string,
    query: GetAllBetaAppLocalizationIDsForAppQuery
): Promise<AppBetaAppLocalizationsLinkagesResponse> {
    return v1.GET(`/apps/${id}/relationships/betaAppLocalizations`, { query })
}

interface ListAppsQuery {
    filter?: {
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        bundleId?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        id?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        name?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        sku?: string[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: (
        | 'betaAppLocalizations'
        | 'betaAppReviewDetail'
        | 'betaGroups'
        | 'betaLicenseAgreement'
        | 'builds'
        | 'preReleaseVersions')[]
    /**
     * Number of resources to return.
     */
    limit?: number
    /**
     * Attributes by which to sort.
     */
    sort?: (
        | 'bundleId'
        | '+bundleId'
        | '-bundleId'
        | 'name'
        | '+name'
        | '-name'
        | 'sku'
        | '+sku'
        | '-sku')[]
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaLicenseAgreements?: BetaLicenseAgreementType[]
        /**
         * Fields to return for included related types.
         */
        preReleaseVersions?: PreReleaseVersionType[]
        /**
         * Fields to return for included related types.
         */
        betaAppReviewDetails?: BetaAppReviewDetailType[]
        /**
         * Fields to return for included related types.
         */
        betaAppLocalizations?: BetaAppLocalizationType[]
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
        /**
         * Fields to return for included related types.
         */
        betaGroups?: BetaGroupType[]
    }
    limitField?: {
        /**
         * Number of included related resources to return.
         */
        preReleaseVersions?: number
        /**
         * Number of included related resources to return.
         */
        builds?: number
        /**
         * Number of included related resources to return.
         */
        betaGroups?: number
        /**
         * Number of included related resources to return.
         */
        betaAppLocalizations?: number
    }
}

interface ReadAppInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaLicenseAgreements?: BetaLicenseAgreementType[]
        /**
         * Fields to return for included related types.
         */
        preReleaseVersions?: PreReleaseVersionType[]
        /**
         * Fields to return for included related types.
         */
        betaAppReviewDetails?: BetaAppReviewDetailType[]
        /**
         * Fields to return for included related types.
         */
        betaAppLocalizations?: BetaAppLocalizationType[]
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
        /**
         * Fields to return for included related types.
         */
        betaGroups?: BetaGroupType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?:
        | 'betaAppLocalizations'
        | 'betaAppReviewDetail'
        | 'betaGroups'
        | 'betaLicenseAgreement'
        | 'builds'
        | 'preReleaseVersions'[]
    limitField?: {
        /**
         * Number of included related resources to return.
         */
        preReleaseVersions?: number
        /**
         * Number of included related resources to return.
         */
        builds?: number
        /**
         * Number of included related resources to return.
         */
        betaGroups?: number
        /**
         * Number of included related resources to return.
         */
        betaAppLocalizations?: number
    }
}

interface ListAllBetaGroupsForAppQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        betaGroups?: BetaGroupType[]
    }
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface GetAllBetaGroupIDsForAppQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface ListAllBuildsForAppQuery {
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

interface GetAllBuildIDsForAppQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface ListAllPrereleaseVersionsForAppQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        preReleaseVersions?: PreReleaseVersionType[]
    }
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface GetAllPrereleaseVersionIDsForAppQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface ReadBetaAppReviewDetailsResourceForAppQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        betaAppReviewDetails?: BetaAppReviewDetailType[]
    }
}

interface ReadBetaLicenseAgreementForAppQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        betaLicenseAgreements?: BetaLicenseAgreementType[]
    }
}

interface ListAllBetaAppLocalizationsForAppQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        betaAppLocalizations?: BetaAppLocalizationType[]
    }
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface GetAllBetaAppLocalizationIDsForAppQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}
