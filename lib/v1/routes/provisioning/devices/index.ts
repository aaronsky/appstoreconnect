import { API, GET, PATCH, POST } from '../../../../api'
import {
    DeviceCreateRequest,
    DeviceResponse,
    DevicesResponse,
    DeviceStatus,
    DeviceUpdateRequest,
} from './types'

/**
 * Register a new device for app development.
 */
export function registerNewDevice(
    api: API,
    body: DeviceCreateRequest
): Promise<DeviceResponse> {
    return POST(api, `/devices`, { body })
}

/**
 * Find and list devices registered to your team.
 */
export function listDevices(
    api: API,
    query: ListDevicesQuery
): Promise<DevicesResponse> {
    return GET(api, `/devices`, { query })
}

/**
 * Get information for a specific device registered to your team.
 */
export function readDeviceInformation(
    api: API,
    id: string,
    query: ReadDeviceInformationQuery
): Promise<DeviceResponse> {
    return GET(api, `/devices/${id}`, { query })
}

/**
 * Update the name or status of a specific device.
 */
export function modifyRegisteredDevice(
    api: API,
    id: string,
    body: DeviceUpdateRequest
): Promise<DeviceResponse> {
    return PATCH(api, `/devices/${id}`, { body })
}

export type ListDevicesSortOption =
    | 'id'
    | '-id'
    | 'name'
    | '-name'
    | 'platform'
    | '-platform'
    | 'status'
    | '-status'
    | 'udid'
    | '-udid'

export type DevicesType =
    | 'addedDate'
    | 'deviceClass'
    | 'model'
    | 'name'
    | 'platform'
    | 'status'
    | 'udid'

export interface ListDevicesQuery {
    fields?: {
        devices?: DevicesType[]
    }
    filter?: {
        id?: string[]
        name?: string[]
        platform?: ('IOS' | 'MAC_OS')[]
        status?: DeviceStatus[]
        udid?: string[]
    }
    limit?: number
    sort?: ListDevicesSortOption[]
}

export interface ReadDeviceInformationQuery {
    fields?: {
        devices?: DevicesType[]
    }
}
