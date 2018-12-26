import { AppType, BetaLicenseAgreementType } from '../../..'
import { API, GET, PATCH } from '../../../../api'
import { ResourceType } from '../../../data'
import { AppResponse } from '../apps/types'
import {
    BetaLicenseAgreementAppLinkageResponse,
    BetaLicenseAgreementResponse,
    BetaLicenseAgreementsResponse,
    BetaLicenseAgreementUpdateRequest,
} from './types'

/**
 * Find and list beta license agreements for all apps.
 * @param query
 */
export function listBetaLicenseAgreements(
    api: API,
    query: ListBetaLicenseAgreementsQuery
): Promise<BetaLicenseAgreementsResponse> {
    return GET(api, `/betaLicenseAgreements`, { query })
}

/**
 * Get a specific beta license agreement.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaLicenseAgreementInformation(
    api: API,
    id: string,
    query: ReadBetaLicenseAgreementInformationQuery
): Promise<BetaLicenseAgreementResponse> {
    return GET(api, `/betaLicenseAgreements/${id}`, { query })
}

/**
 * Get the app information for a specific beta license agreement.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppInformationForBetaLicenseAgreement(
    api: API,
    id: string,
    query: ReadAppInformationForBetaLicenseAgreementQuery
): Promise<AppResponse> {
    return GET(api, `/betaLicenseAgreements/${id}/app`, { query })
}

/**
 * Get the app resource ID for a specific beta license agreement.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getAppResourceIDForBetaLicenseAgreement(
    api: API,
    id: string
): Promise<BetaLicenseAgreementAppLinkageResponse> {
    return GET(api, `/betaLicenseAgreements/${id}/relationships/app`)
}

/**
 * Update the text for your beta license agreement.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyBetaLicenseAgreement(
    api: API,
    id: string,
    body: BetaLicenseAgreementUpdateRequest
): Promise<BetaLicenseAgreementResponse> {
    return PATCH(api, `/betaLicenseAgreements/${id}`, { body })
}

interface ListBetaLicenseAgreementsQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaLicenseAgreements?: BetaLicenseAgreementType[]
    }
    filter?: {
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
    limit?: number
}

interface ReadBetaLicenseAgreementInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
        /**
         * Fields to return for included related types.
         */
        betaLicenseAgreements?: BetaLicenseAgreementType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ResourceType<'app'>[]
}

interface ReadAppInformationForBetaLicenseAgreementQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
    }
}
