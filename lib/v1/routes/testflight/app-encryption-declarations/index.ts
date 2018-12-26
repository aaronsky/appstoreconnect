import { AppEncryptionDeclarationType, AppType } from '../../..'
import { API, GET, POST } from '../../../../api'
import { ResourceType } from '../../../data'
import { AppResponse } from '../apps/types'
import {
    AppEncryptionDeclarationAppLinkageResponse,
    AppEncryptionDeclarationBuildsLinkagesRequest,
    AppEncryptionDeclarationResponse,
    AppEncryptionDeclarationsResponse,
} from './types'

/**
 * Find and list all available app encryption declarations.
 * @param query
 */
export function listAppEncryptionDeclarations(
    api: API,
    query: ListAppEncryptionDeclarationsQuery
): Promise<AppEncryptionDeclarationsResponse> {
    return GET(api, `/appEncryptionDeclarations`, { query })
}

/**
 * Get information about a specific app encryption declaration.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppEncryptionDeclarationInformation(
    api: API,
    id: string,
    query: ReadAppEncryptionDeclarationInformationQuery
): Promise<AppEncryptionDeclarationResponse> {
    return GET(api, `/appEncryptionDeclarations/${id}`, { query })
}

/**
 * Get the app information from a specific app encryption declaration.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppInformationForAppEncryptionDeclaration(
    api: API,
    id: string,
    query: ReadAppInformationForAppEncryptionDeclarationQuery
): Promise<AppResponse> {
    return GET(api, `/appEncryptionDeclarations/${id}/app`, { query })
}

/**
 * Get the app resource ID associated with a specific app encryption declaration.
 * @param id An opaque resource ID that uniquely identifies the resource.

 */
export function getAppResourceIDForAppEncryptionDeclaration(
    api: API,
    id: string
): Promise<AppEncryptionDeclarationAppLinkageResponse> {
    return GET(api, `/appEncryptionDeclarations/${id}/relationships/app`)
}

/**
 * Assign one or more builds to an app encryption declaration.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function assignBuildsToAppEncryptionDeclaration(
    api: API,
    id: string,
    body: AppEncryptionDeclarationBuildsLinkagesRequest
): Promise<void> {
    return POST(api, `/appEncryptionDeclarations/${id}/relationships/builds`, {
        body,
    })
}

interface ListAppEncryptionDeclarationsQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        appEncryptionDeclarations?: AppEncryptionDeclarationType[]
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
    }
    filter?: {
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        app?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        builds?: string[]
        /**
         * Attributes, relationships, and IDs by which to filter.
         */
        platform?: string[]
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

interface ReadAppEncryptionDeclarationInformationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        appEncryptionDeclarations?: AppEncryptionDeclarationType[]
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: ResourceType<'app'>[]
}

interface ReadAppInformationForAppEncryptionDeclarationQuery {
    fields?: {
        /**
         * Fields to return for included related types.
         */
        apps?: AppType[]
    }
}
