import {
    AppEncryptionDeclarationBuildsLinkagesRequest,
    AppEncryptionDeclarationAppLinkageResponse,
    AppEncryptionDeclarationResponse,
    AppEncryptionDeclarationsResponse,
} from './types'
import { AppResponse } from '../apps/types'
import v1, { AppEncryptionDeclarationType, AppType } from '../../..'
import { ResourceType } from '../../../data'

/**
 * Find and list all available app encryption declarations.
 * @param query
 */
export function listAppEncryptionDeclarations(
    query: ListAppEncryptionDeclarationsQuery
): Promise<AppEncryptionDeclarationsResponse> {
    return v1.GET(`/appEncryptionDeclarations`, { query })
}

/**
 * Get information about a specific app encryption declaration.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppEncryptionDeclarationInformation(
    id: string,
    query: ReadAppEncryptionDeclarationInformationQuery
): Promise<AppEncryptionDeclarationResponse> {
    return v1.GET(`/appEncryptionDeclarations/${id}`, { query })
}

/**
 * Get the app information from a specific app encryption declaration.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param query
 */
export function readAppInformationForAppEncryptionDeclaration(
    id: string,
    query: ReadAppInformationForAppEncryptionDeclarationQuery
): Promise<AppResponse> {
    return v1.GET(`/appEncryptionDeclarations/${id}/app`, { query })
}

/**
 * Get the app resource ID associated with a specific app encryption declaration.
 * @param id An opaque resource ID that uniquely identifies the resource.

 */
export function getAppResourceIDForAppEncryptionDeclaration(
    id: string
): Promise<AppEncryptionDeclarationAppLinkageResponse> {
    return v1.GET(`/appEncryptionDeclarations/${id}/relationships/app`)
}

/**
 * Assign one or more builds to an app encryption declaration.
 * @param id An opaque resource ID that uniquely identifies the resource.
 * @param body
 */
export function assignBuildsToAppEncryptionDeclaration(
    id: string,
    body: AppEncryptionDeclarationBuildsLinkagesRequest
): Promise<void> {
    return v1.POST(`/appEncryptionDeclarations/${id}/relationships/builds`, {
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
