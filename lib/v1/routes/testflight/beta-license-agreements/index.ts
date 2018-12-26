import {
    BetaLicenseAgreementUpdateRequest,
    BetaLicenseAgreementResponse,
    BetaLicenseAgreementsResponse,
    BetaLicenseAgreementAppLinkageResponse,
} from './types'
import v1, { AppType, BetaLicenseAgreementType } from '../../..'
import { AppResponse } from '../apps/types'
import { ResourceType } from '../../../data'

/**
 * Find and list beta license agreements for all apps.
 * @param query
 */
export function listBetaLicenseAgreements(
    query: ListBetaLicenseAgreementsQuery
): Promise<BetaLicenseAgreementsResponse> {
    return v1.GET(`/betaLicenseAgreements`, { query })
}

/**
 * Get a specific beta license agreement.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readBetaLicenseAgreementInformation(
    id: string,
    query: ReadBetaLicenseAgreementInformationQuery
): Promise<BetaLicenseAgreementResponse> {
    return v1.GET(`/betaLicenseAgreements/${id}`, { query })
}

/**
 * Get the app information for a specific beta license agreement.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppInformationForBetaLicenseAgreement(
    id: string,
    query: ReadAppInformationForBetaLicenseAgreementQuery
): Promise<AppResponse> {
    return v1.GET(`/betaLicenseAgreements/${id}/app`, { query })
}

/**
 * Get the app resource ID for a specific beta license agreement.
 * @param id An opaque resource ID that uniquely identifies the resource.
 */
export function getAppResourceIDForBetaLicenseAgreement(
    id: string
): Promise<BetaLicenseAgreementAppLinkageResponse> {
    return v1.GET(`/betaLicenseAgreements/${id}/relationships/app`)
}

/**
 * Update the text for your beta license agreement.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function modifyBetaLicenseAgreement(
    id: string,
    body: BetaLicenseAgreementUpdateRequest
): Promise<BetaLicenseAgreementResponse> {
    return v1.PATCH(`/betaLicenseAgreements/${id}`, { body })
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
