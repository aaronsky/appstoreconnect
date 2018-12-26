import v1, { BuildType, BetaBuildLocalizationType, Locale } from '../../..'
import {
    BetaBuildLocalizationsResponse,
    BetaBuildLocalizationResponse,
    BetaBuildLocalizationBuildLinkageResponse,
    BetaBuildLocalizationCreateRequest,
    BetaBuildLocalizationUpdateRequest,
} from './types'
import { ResourceType } from '../../../data'
import { BuildResponse } from '../builds/types'

/**
 * Find and list beta build localizations currently associated with apps.
 * @param query
 */
export function listBetaBuildLocalizations(
    query: ListBetaBuildLocalizationsQuery
): Promise<BetaBuildLocalizationsResponse> {
    return v1.GET(`/betaBuildLocalizations`, { query })
}

/**
 * Get a specific beta build localization resource.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaBuildLocalizationInformation(
    id: string,
    query: ReadBetaBuildLocalizationInformationQuery
): Promise<BetaBuildLocalizationResponse> {
    return v1.GET(`/betaBuildLocalizations/${id}`, { query })
}

/**
 * Get the build information for a specific beta build localization.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBuildInformationForBetaBuildLocalization(
    id: string,
    query: ReadBuildInformationForBetaBuildLocalizationQuery
): Promise<BuildResponse> {
    return v1.GET(`/betaBuildLocalizations/${id}/build`, { query })
}

/**
 * Get a build resource ID for a specific beta build localization.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getBuildIDForBetaBuildLocalization(
    id: string
): Promise<BetaBuildLocalizationBuildLinkageResponse> {
    return v1.GET(`/betaBuildLocalizations/${id}/relationships/build`)
}

/**
 * Create localized What’s New text for a build.
 * @param body
 */
export function createBetaBuildLocalization(
    body: BetaBuildLocalizationCreateRequest
): Promise<BetaBuildLocalizationResponse> {
    return v1.POST(`/betaBuildLocalizations`, { body })
}

/**
 * Update the localized What’s New text for a specific beta build and locale.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyBetaBuildLocalization(
    id: string,
    body: BetaBuildLocalizationUpdateRequest
): Promise<BetaBuildLocalizationResponse> {
    return v1.PATCH(`/betaBuildLocalizations/${id}`, { body })
}

/**
 * Delete a specific beta build localization associated with a build.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function deleteBetaBuildLocalization(id: string): Promise<void> {
    return v1.DELETE(`/betaBuildLocalizations/${id}`)
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
