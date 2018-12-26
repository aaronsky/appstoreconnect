import {
    BetaAppLocalizationUpdateRequest,
    BetaAppLocalizationCreateRequest,
    BetaAppLocalizationsResponse,
    BetaAppLocalizationResponse,
    BetaAppLocalizationAppLinkageResponse,
} from './types'
import v1, { AppType, BetaAppLocalizationType } from '../../..'
import { AppResponse } from '../apps/types'
import { ResourceType } from '../../../data'

/**
 * Find and list beta app localizations for all apps and locales.
 * @param query
 */
export function listBetaAppLocalizations(
    query: ListBetaAppLocalizationsQuery
): Promise<BetaAppLocalizationsResponse> {
    return v1.GET(`/betaAppLocalizations`, { query })
}

/**
 * Get localized beta app information for a specific app and locale.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaAppLocalizationInformation(
    id: string,
    query: ReadBetaAppLocalizationInformationQuery
): Promise<BetaAppLocalizationResponse> {
    return v1.GET(`/betaAppLocalizations/${id}`, { query })
}

/**
 * Get the app information associated with a specific beta app localization.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppInformationForBetaAppLocalization(
    id: string,
    query: ReadAppInformationForBetaAppLocalizationQuery
): Promise<AppResponse> {
    return v1.GET(`/betaAppLocalizations/${id}/app`, { query })
}

/**
 * Get the app resource ID for a specified beta app localization.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getAppResourceIDForBetaAppLocalization(
    id: string
): Promise<BetaAppLocalizationAppLinkageResponse> {
    return v1.GET(`/betaAppLocalizations/${id}/relationships/app`)
}

/**
 * Create localized descriptive information for an app.
 * @param body
 */
export function createBetaAppLocalization(
    body: BetaAppLocalizationCreateRequest
): Promise<BetaAppLocalizationResponse> {
    return v1.POST(`/betaAppLocalizations`, { body })
}

/**
 * Update the localized What’s New text for a specific app and locale.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyBetaAppLocalization(
    id: string,
    body: BetaAppLocalizationUpdateRequest
): Promise<BetaAppLocalizationResponse> {
    return v1.PATCH(`/betaAppLocalizations/${id}`, { body })
}

/**
 * Delete a beta app localization associated with an app.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function deleteBetaAppLocalization(id: string): Promise<void> {
    return v1.DELETE(`/betaAppLocalizations/${id}`)
}

interface ListBetaAppLocalizationsQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaAppLocalizations?: BetaAppLocalizationType[]
    }
    filter?: {
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        app?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        locale?: string[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ResourceType<'app'>[]
    /**
     * Number of resources to return.
     */
    limit?: number
}

interface ReadBetaAppLocalizationInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaAppLocalizations?: BetaAppLocalizationType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ResourceType<'app'>[]
}

interface ReadAppInformationForBetaAppLocalizationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
    }
}
