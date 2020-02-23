import { API, DELETE, GET, POST } from '../../../../api'
import {
    ProfileBundleIdLinkageResponse,
    ProfileCertificatesLinkagesResponse,
    ProfileCreateRequest,
    ProfileDevicesLinkagesResponse,
    ProfileResponse,
    ProfilesResponse,
    ProfileState,
    ProfilesType,
    ProfileType,
} from './types'
import { BundleIdResponse } from '../bundle-ids/types'
import { CertificatesResponse } from '../certificates/types'
import { DevicesResponse } from '../devices/types'
import { CertificatesType } from '../certificates'
import { DevicesType } from '../devices'
import { BundleIdsType } from '../bundle-ids'

/**
 * Create a new provisioning profile.
 */
export function createProfile(
    api: API,
    body: ProfileCreateRequest
): Promise<ProfileResponse> {
    return POST(api, `/profiles`, { body })
}

/**
 * Delete a provisioning profile that is used for app development or distribution.
 */
export function deleteProfile(api: API, id: string): Promise<void> {
    return DELETE(api, `/profiles/${id}`)
}

/**
 * Find and list provisioning profiles and download their data.
 */
export function listAndDownloadProfiles(
    api: API,
    query: ListAndDownloadProfilesQuery
): Promise<ProfilesResponse> {
    return GET(api, '/profiles/', { query })
}

/**
 * Find and list provisioning profiles and download their data.
 */
export function readAndDownloadProfileInformation(
    api: API,
    id: string,
    query: ReadAndDownloadProfileInformationQuery
): Promise<ProfileResponse> {
    return GET(api, `/profiles/${id}`, { query })
}

/**
 * Get the bundle ID information for a specific provisioning profile.
 */
export function readBundleIdForProfile(
    api: API,
    id: string,
    query: ReadBundleIdForProfileQuery
): Promise<BundleIdResponse> {
    return GET(api, `/profiles/${id}/bundleId`, { query })
}

/**
 * Get the resource ID of a bundle associated with a specific provisioning profile.
 */
export function getBundleResourceIdForProfile(
    api: API,
    id: string
): Promise<ProfileBundleIdLinkageResponse> {
    return GET(api, `/profiles/${id}/relationships/bundleId`)
}

/**
 * Get a list of all certificates and their data for a specific provisioning profile.
 */
export function listAllCertificatesForProfile(
    api: API,
    id: string,
    query: ListAllCertificatesForProfileQuery
): Promise<CertificatesResponse> {
    return GET(api, `/profiles/${id}/certificates`, { query })
}

/**
 * Get the resource IDs of all certificates associated with a specific provisioning profile.
 */
export function getAllCertificateIdsForProfile(
    api: API,
    id: string,
    query: GetAllCertificateIdsForProfileQuery
): Promise<ProfileCertificatesLinkagesResponse> {
    return GET(api, `/profiles/${id}/relationships/certificates`, { query })
}

/**
 * Get a list of all devices for a specific provisioning profile.
 */
export function listAllDevicesForProfile(
    api: API,
    id: string,
    query: ListAllDevicesForProfileQuery
): Promise<DevicesResponse> {
    return GET(api, `/profiles/${id}/devices`, { query })
}

/**
 * Get the resource IDs of all devices associated with a specific provisioning profile.
 */
export function getAllDeviceResourceIdsForProfile(
    api: API,
    id: string,
    query: GetAllDeviceResourceIdsForProfileQuery
): Promise<ProfileDevicesLinkagesResponse> {
    return GET(api, `/profiles/${id}/relationships/devices`, { query })
}

type ListAndDownloadProfilesQuerySortOptions =
    | 'id'
    | '-id'
    | 'name'
    | '-name'
    | 'profileState'
    | '-profileState'
    | 'profileType'
    | '-profileType'

interface ListAndDownloadProfilesQuery {
    fields?: {
        certificates?: CertificatesType[]
        devices?: DevicesType[]
        profiles?: ProfilesType[]
        bundleIds?: BundleIdsType[]
    }
    filter?: {
        id?: string[]
        name?: string[]
        profileState?: ProfileState[]
        profileType?: ProfileType[]
    }
    limit?: number
    sort?: ListAndDownloadProfilesQuerySortOptions[]
}

interface ReadAndDownloadProfileInformationQuery {
    fields?: {
        certificates?: CertificatesType[]
        devices?: DevicesType[]
        profiles?: ProfilesType[]
        bundleIds?: BundleIdsType[]
    }
    include?: ('bundleId' | 'certificates' | 'devices')[]
    limit?: {
        devices?: number
        certificates?: number
    }
}

interface ReadBundleIdForProfileQuery {
    fields?: {
        bundleIds?: BundleIdsType[]
    }
}

interface ListAllCertificatesForProfileQuery {
    limit?: number
    fields?: {
        certificates?: CertificatesType[]
    }
}

interface GetAllCertificateIdsForProfileQuery {
    limit?: number
}

interface ListAllDevicesForProfileQuery {
    limit?: number
    fields?: {
        devices?: DevicesType[]
    }
}

interface GetAllDeviceResourceIdsForProfileQuery {
    limit?: number
}
