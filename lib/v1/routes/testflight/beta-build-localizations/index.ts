import { BetaBuildLocalizationType, BuildType, Locale } from '../../..'
import { API, DELETE, GET, PATCH, POST } from '../../../../api'
import { ResourceType } from '../../../data'
import { BuildResponse } from '../builds/types'
import {
    BetaBuildLocalizationBuildLinkageResponse,
    BetaBuildLocalizationCreateRequest,
    BetaBuildLocalizationResponse,
    BetaBuildLocalizationsResponse,
    BetaBuildLocalizationUpdateRequest,
} from './types'

/**
 * Find and list beta build localizations currently associated with apps.
 * @param query
 */
export function listBetaBuildLocalizations(
    api: API,
    query: ListBetaBuildLocalizationsQuery
): Promise<BetaBuildLocalizationsResponse> {
    return GET(api, `/betaBuildLocalizations`, { query })
}

/**
 * Get a specific beta build localization resource.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaBuildLocalizationInformation(
    api: API,
    id: string,
    query: ReadBetaBuildLocalizationInformationQuery
): Promise<BetaBuildLocalizationResponse> {
    return GET(api, `/betaBuildLocalizations/${id}`, { query })
}

/**
 * Get the build information for a specific beta build localization.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBuildInformationForBetaBuildLocalization(
    api: API,
    id: string,
    query: ReadBuildInformationForBetaBuildLocalizationQuery
): Promise<BuildResponse> {
    return GET(api, `/betaBuildLocalizations/${id}/build`, { query })
}

/**
 * Get a build resource ID for a specific beta build localization.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getBuildIDForBetaBuildLocalization(
    api: API,
    id: string
): Promise<BetaBuildLocalizationBuildLinkageResponse> {
    return GET(api, `/betaBuildLocalizations/${id}/relationships/build`)
}

/**
 * Create localized What’s New text for a build.
 * @param body
 */
export function createBetaBuildLocalization(
    api: API,
    body: BetaBuildLocalizationCreateRequest
): Promise<BetaBuildLocalizationResponse> {
    return POST(api, `/betaBuildLocalizations`, { body })
}

/**
 * Update the localized What’s New text for a specific beta build and locale.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyBetaBuildLocalization(
    api: API,
    id: string,
    body: BetaBuildLocalizationUpdateRequest
): Promise<BetaBuildLocalizationResponse> {
    return PATCH(api, `/betaBuildLocalizations/${id}`, { body })
}

/**
 * Delete a specific beta build localization associated with a build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function deleteBetaBuildLocalization(
    api: API,
    id: string
): Promise<void> {
    return DELETE(api, `/betaBuildLocalizations/${id}`)
}

interface ListBetaBuildLocalizationsQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        betaBuildLocalizations?: BetaBuildLocalizationType[]
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
        locale: Locale[]
    }
    /**
     */
    include?: ResourceType<'build'>[]
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface ReadBetaBuildLocalizationInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        betaBuildLocalizations?: BetaBuildLocalizationType[]
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ResourceType<'builds'>[]
}

interface ReadBuildInformationForBetaBuildLocalizationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        builds?: BuildType[]
    }
}
