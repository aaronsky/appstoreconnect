import {
    BuildsResponse,
    BuildResponse,
    BuildAppLinkageResponse,
    BuildPreReleaseVersionLinkageResponse,
    ProcessingState,
    BuildUpdateRequest,
    BuildAppEncryptionDeclarationLinkageRequest,
    BuildBetaGroupsLinkagesRequest,
    BuildIndividualTestersLinkagesRequest,
    BuildIndividualTestersLinkagesResponse,
    BuildAppEncryptionDeclarationLinkageResponse,
    BuildBetaBuildLocalizationsLinkagesResponse,
    BuildBuildBetaDetailLinkageResponse,
} from './types'
import v1, {
    PreReleaseVersionType,
    AppType,
    BuildBetaDetailType,
    BetaAppReviewSubmissionType,
    BetaBuildLocalizationType,
    BuildType,
    AppEncryptionDeclarationType,
    BetaTesterType,
} from '../../..'
import { AppResponse } from '../apps/types'
import {
    BetaAppReviewSubmissionResponse,
    BuildBetaAppReviewSubmissionLinkageResponse,
} from '../beta-app-review-submissions/types'
import { BuildBetaDetailResponse } from '../build-beta-details/types'
import { BetaBuildLocalizationsResponse } from '../beta-build-localizations/types'
import { PrereleaseVersionResponse } from '../prerelease-versions/types'
import { BetaTestersResponse } from '../beta-testers/types'
import { AppEncryptionDeclarationResponse } from '../app-encryption-declarations/types'

/**
 * Find and list builds for all apps in App Store Connect.
 */
export function listBuilds(query: ListBuildsQuery): Promise<BuildsResponse> {
    return v1.GET(`/builds`, { query })
}

/**
 * Get information about a specific build.
 */
export function readBuildInformation(
    id: string,
    query: ReadBuildInformationQuery
): Promise<BuildResponse> {
    return v1.GET(`/builds/${id}`, { query })
}

/**
 * Get the app information for a specific build.
 */
export function readAppInformationForBuild(
    id: string,
    query: ReadAppInformationQuery
): Promise<AppResponse> {
    return v1.GET(`/builds/${id}/app`, { query })
}

/**
 * Get the app resource ID associated with a specific build.
 */
export function getAppResourceIDForBuild(
    id: string
): Promise<BuildAppLinkageResponse> {
    return v1.GET(`/builds/${id}/relationships/app`)
}

/**
 * Get the prerelease version for a specific build.
 */
export function readPrereleaseVersionForBuild(
    id: string,
    query: ReadPrereleaseVersionForBuildQuery
): Promise<PrereleaseVersionResponse> {
    return v1.GET(`/builds/${id}/preReleaseVersion`, { query })
}

/**
 * Get a list of resource IDs of prerelease versions associated with a build.
 */
export function getAllResourceIDsForPrereleaseVersionsForBuild(
    id: string
): Promise<BuildPreReleaseVersionLinkageResponse> {
    return v1.GET(`/builds/${id}/relationships/preReleaseVersion`)
}

/**
 * Expire a build or change its encryption exemption setting.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyBuild(
    id: string,
    body: BuildUpdateRequest
): Promise<BuildResponse> {
    return v1.PATCH(`/builds/${id}`, { body })
}

/**
 * Assign an app encryption declaration to a build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function assignAppEncryptionDeclarationForBuild(
    id: string,
    body: BuildAppEncryptionDeclarationLinkageRequest
): Promise<void> {
    return v1.PATCH(`/builds/${id}/relationships/appEncryptionDeclaration`, {
        body,
    })
}

/**
 * Add or create a beta group to a build to enable testing.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function addAccessForBetaGroupsForBuild(
    id: string,
    body: BuildBetaGroupsLinkagesRequest
): Promise<void> {
    return v1.POST(`/builds/${id}/relationships/betaGroups`, { body })
}

/**
 * Remove access to a specific build for all beta testers in one or more beta groups.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function removeAccessForBetaGroupsForBuild(
    id: string,
    body: BuildBetaGroupsLinkagesRequest
): Promise<void> {
    return v1.DELETE(`/builds/${id}/relationships/betaGroups`, { body })
}

/**
 * Enable a beta tester who is not a part of a beta group to test a build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function assignIndividualTestersForBuild(
    id: string,
    body: BuildIndividualTestersLinkagesRequest
): Promise<void> {
    return v1.POST(`/builds/${id}/relationships/individualTesters`, { body })
}

/**
 * Remove access to test a specific build from one or more individually assigned testers.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function removeIndividualTestersFromBuild(
    id: string,
    body: BuildIndividualTestersLinkagesRequest
): Promise<void> {
    return v1.DELETE(`/builds/${id}/relationships/individualTesters`, { body })
}

/**
 * Get a list of beta testers individually assigned to a build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllIndividualTestersForBuild(
    id: string,
    query: ListAllIndividualTestersForBuildQuery
): Promise<BetaTestersResponse> {
    return v1.GET(`/builds/${id}/individualTesters`, { query })
}

/**
 * Get a list of resource IDs of individual testers associated with a build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllResourceIDsForIndividualTestersForBuild(
    id: string,
    query: GetAllResourceIDsForIndividualTestersForBuildQuery
): Promise<BuildIndividualTestersLinkagesResponse> {
    return v1.GET(`/builds/${id}/relationships/individualTesters`, { query })
}

/**
 * Get the beta app review submission status for a specific build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaAppReviewSubmissionForBuild(
    id: string,
    query: ReadBetaAppReviewSubmissionForBuildQuery
): Promise<BetaAppReviewSubmissionResponse> {
    return v1.GET(`/builds/${id}/betaAppReviewSubmission`, { query })
}

/**
 * Get the beta app review submission resource ID associated with a specific build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getBetaAppReviewSubmissionIDForBuild(
    id: string
): Promise<BuildBetaAppReviewSubmissionLinkageResponse> {
    return v1.GET(`/builds/${id}/relationships/betaAppReviewSubmission`)
}

/**
 * Get the beta test details for a specific build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBuildBetaDetailsInformationForBuild(
    id: string,
    query: ReadBuildBetaDetailsInformationForBuildQuery
): Promise<BuildBetaDetailResponse> {
    return v1.GET(`/builds/${id}/buildBetaDetail`, { query })
}

/**
 * Get the build beta details resource ID associated with a specific build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getBuildBetaDetailsResourceIDForBuild(
    id: string
): Promise<BuildBuildBetaDetailLinkageResponse> {
    return v1.GET(`/builds/${id}/relationships/buildBetaDetail`)
}

/**
 * Read an app encryption declaration associated with a specific build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppEncryptionDeclarationForBuild(
    id: string,
    query: ReadAppEncryptionDeclarationForBuildQuery
): Promise<AppEncryptionDeclarationResponse> {
    return v1.GET(`/builds/${id}/appEncryptionDeclaration`, { query })
}

/**
 * Get the beta app encryption declaration resource ID associated with a build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getAppEncryptionDeclarationIDForBuild(
    id: string
): Promise<BuildAppEncryptionDeclarationLinkageResponse> {
    return v1.GET(`/builds/${id}/relationships/appEncryptionDeclaration`)
}

/**
 * Get a list of localized beta test information for a specific build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function listAllBetaBuildLocalizationsForBuild(
    id: string,
    query: ListAllBetaBuildLocalizationsForBuildQuery
): Promise<BetaBuildLocalizationsResponse> {
    return v1.GET(`/builds/${id}/betaBuildLocalizations`, { query })
}

/**
 * Get a list of beta build localization resource IDs associated with a build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function getAllBetaBuildLocalizationIDsForBuild(
    id: string,
    query: GetAllBetaBuildLocalizationIDsForBuildQuery
): Promise<BuildBetaBuildLocalizationsLinkagesResponse> {
    return v1.GET(`/builds/${id}/relationships/betaBuildLocalizations`, {
        query,
    })
}

interface ListBuildsQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        appEncryptionDeclarations?: AppEncryptionDeclarationType[]
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaTesters?: BetaTesterType[]
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
        /**
         * Fields to return for included related types.
         */
        preReleaseVersions?: PreReleaseVersionType[]
        /**
         * Fields to return for included related types.
         */
        buildBetaDetails?: BuildBetaDetailType[]
        /**
         * Fields to return for included related types.
         */
        betaAppReviewSubmissions?: BetaAppReviewSubmissionType[]
        /**
         * Fields to return for included related types.
         */
        betaBuildLocalizations?: BetaBuildLocalizationType[]
    }
    filter?: {
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        app?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        expired?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        id?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        preReleaseVersion?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        processingState?: ProcessingState[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        version?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        usesNonExemptEncryption?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        'preReleaseVersion.version'?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        betaGroups?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        'betaAppReviewSubmission.betaReviewState'?: string[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: (
        | 'app'
        | 'appEncryptionDeclaration'
        | 'betaAppReviewSubmission'
        | 'betaBuildLocalizations'
        | 'buildBetaDetail'
        | 'individualTesters'
        | 'preReleaseVersion')[]
    /**
     * Number of resources to return.
     */
    limit?: number
    /**
     * Attributes by which to sort.
     */
    sort?: (
        | '+preReleaseVersion'
        | '-preReleaseVersion'
        | 'uploadedDate'
        | '+uploadedDate'
        | '-uploadedDate'
        | 'version'
        | '+version'
        | '-version')[]
    limitField?: {
        /**
         * Number of included related resources to return.
         */
        individualTesters?: number
        /**
         * Number of included related resources to return.
         */
        betaBuildLocalizations?: number
    }
}

interface ReadBuildInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        appEncryptionDeclarations?: AppEncryptionDeclarationType[]
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaTesters?: BetaTesterType[]
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
        /**
         * Fields to return for included related types.
         */
        preReleaseVersions: PreReleaseVersionType[]
        /**
         * Fields to return for included related types.
         */
        buildBetaDetails?: BuildBetaDetailType[]
        /**
         * Fields to return for included related types.
         */
        betaAppReviewSubmissions?: BetaAppReviewSubmissionType[]
        /**
         * Fields to return for included related types.
         */
        betaBuildLocalizations?: BetaBuildLocalizationType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: (
        | 'app'
        | 'appEncryptionDeclaration'
        | 'betaAppReviewSubmission'
        | 'betaBuildLocalizations'
        | 'buildBetaDetail'
        | 'individualTesters'
        | 'preReleaseVersion')[]
    limitField?: {
        /**
         * Fields to return for included related types.
         */
        individualTesters?: number
        /**
         * Fields to return for included related types.
         */
        betaBuildLocalizations?: number
    }
}

interface ReadAppInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
    }
}

interface ReadPrereleaseVersionForBuildQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        preReleaseVersions: PreReleaseVersionType[]
    }
}

interface ListAllIndividualTestersForBuildQuery {
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

interface GetAllResourceIDsForIndividualTestersForBuildQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface ReadBetaAppReviewSubmissionForBuildQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        betaAppReviewSubmissions?: BetaAppReviewSubmissionType[]
    }
}

interface ReadBuildBetaDetailsInformationForBuildQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        buildBetaDetails?: BuildBetaDetailType[]
    }
}

interface ReadAppEncryptionDeclarationForBuildQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        appEncryptionDeclarations?: AppEncryptionDeclarationType[]
    }
}

interface ListAllBetaBuildLocalizationsForBuildQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        betaBuildLocalizations?: BetaBuildLocalizationType[]
    }
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface GetAllBetaBuildLocalizationIDsForBuildQuery {
    /**
     * Number of resources to return.
     */
    limit?: number
}
