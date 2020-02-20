import { API, DELETE, GET, PATCH, POST } from '../../../../api'
import {
    BundleIdBundleIdCapabilitiesLinkagesResponse,
    BundleIdCreateRequest,
    BundleIdPlatform,
    BundleIdProfilesLinkagesResponse,
    BundleIdResponse,
    BundleIdsResponse,
    BundleIdUpdateRequest,
} from './types'
import { ProfilesResponse, ProfilesType } from '../profiles/types'
import { ResourceType } from '../../../data'
import { BundleIdCapabilitiesResponse } from '../bundle-id-capabilities/types'

/**
 * Register a new bundle ID for app development.
 */
export function registerNewBundleId(
    api: API,
    body: BundleIdCreateRequest
): Promise<BundleIdResponse> {
    return POST(api, '/bundleIds', { body })
}

/**
 * Update a specific bundle ID’s name.
 */
export function modifyBundleId(
    api: API,
    id: string,
    body: BundleIdUpdateRequest
): Promise<BundleIdResponse> {
    return PATCH(api, `/bundleIds/${id}`, { body })
}

/**
 * Delete a bundle ID that is used for app development.
 */
export function deleteBundleId(api: API, id: string): Promise<void> {
    return DELETE(api, `/bundleIds/${id}`)
}

/**
 * Find and list bundle IDs that are registered to your team.
 */
export function listBundleIds(
    api: API,
    query: ListBundleIdsQuery
): Promise<BundleIdsResponse> {
    return GET(api, '/bundleIds', { query })
}

/**
 * Get information about a specific bundle ID.
 */
export function readBundleIdInformation(
    api: API,
    id: string,
    query: ReadBundleIdInformationQuery
): Promise<BundleIdsResponse> {
    return GET(api, `/bundleIds/${id}`, { query })
}

/**
 * Get the resource IDs for all profiles associated with a specific bundle ID.
 */
export function getAllProfileIdsForBundleId(
    api: API,
    id: string,
    query: GetAllProfileIdsForBundleIdQuery
): Promise<BundleIdProfilesLinkagesResponse> {
    return GET(api, `/bundleIds/${id}/relationships/profiles`, { query })
}

/**
 * Get a list of all profiles for a specific bundle ID.
 */
export function listAllProfilesForBundleId(
    api: API,
    id: string,
    query: ListAllProfilesForBundleIdQuery
): Promise<ProfilesResponse> {
    return GET(api, `/bundleIds/${id}/profiles`, { query })
}

/**
 * Get the resource IDs for all capabilities associated with a specific bundle ID.
 */
export function getAllCapabililityIdsForBundleId(
    api: API,
    id: string,
    query: GetAllCapabililityIdsForBundleIdQuery
): Promise<BundleIdBundleIdCapabilitiesLinkagesResponse> {
    return GET(api, `/bundleIds/${id}/relationships/bundleIdCapabilities`, {
        query,
    })
}

/**
 * Get a list of all capabilities for a specific bundle ID.
 */
export function listAllCapabilitiesForBundleId(
    api: API,
    id: string,
    query: ListAllCapabilitiesForBundleIdQuery
): Promise<BundleIdCapabilitiesResponse> {
    return GET(api, `/bundleIds/${id}/bundleIdCapabilities`, { query })
}

export type BundleIdsType =
    | 'bundleIdCapabilities'
    | 'identifier'
    | 'name'
    | 'platform'
    | 'profiles'
    | 'seedId'

type BundleIdCapabilitiesType = 'bundleId' | 'capabilityType' | 'settings'

type ListBundleIdsQuerySortOptions =
    | 'id'
    | '-id'
    | 'name'
    | '-name'
    | 'platform'
    | '-platform'
    | 'seedId'
    | '-seedId'

type BundleIdsInclude =
    | ResourceType<'bundleIdCapabilities'>
    | ResourceType<'profiles'>

interface BundleIdsQueryFields {
    bundleIds?: BundleIdsType[]
    profiles?: ProfilesType[]
    bundleIdCapabilities?: BundleIdCapabilitiesType[]
}

interface ListBundleIdsQuery {
    filter?: {
        id?: string[]
        identifier?: string[]
        name?: string[]
        platform?: BundleIdPlatform[]
        seedId?: string[]
    }
    /**
     * Relationship data to include in the response.
     */
    include?: BundleIdsInclude[]
    /**
     * Attributes by which to sort.
     */
    sort?: ListBundleIdsQuerySortOptions[]
    fields?: BundleIdsQueryFields
}

interface ReadBundleIdInformationQuery {
    fields?: BundleIdsQueryFields
    /**
     * Relationship data to include in the response.
     */
    include?: BundleIdsInclude[]
    limit?: {
        profiles: number
    }
}

interface GetAllProfileIdsForBundleIdQuery {
    limit?: number
}

interface ListAllProfilesForBundleIdQuery {
    limit?: number
    fields?: {
        profiles?: ProfilesType[]
    }
}

interface GetAllCapabililityIdsForBundleIdQuery {
    limit?: number
}

interface ListAllCapabilitiesForBundleIdQuery {
    fields?: {
        bundleIdCapabilities?: BundleIdCapabilitiesType[]
    }
    limit?: number
}
