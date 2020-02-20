import { API, DELETE, PATCH, POST } from '../../../../api'
import {
    BundleIdCapabilityCreateRequest,
    BundleIdCapabilityResponse,
    BundleIdCapabilityUpdateRequest,
} from './types'

/**
 * Enable a capability for a bundle ID.
 */
export function enableCapability(
    api: API,
    body: BundleIdCapabilityCreateRequest
): Promise<BundleIdCapabilityResponse> {
    return POST(api, '/bundleIdCapabilities', { body })
}

/**
 * Disable a capability for a bundle ID.
 */
export function disableCapability(api: API, id: string): Promise<void> {
    return DELETE(api, `/bundleIdCapabilities/${id}`)
}

/**
 * Update the configuration of a specific capability.
 */
export function modifyCapabilityConfiguration(
    api: API,
    id: string,
    body: BundleIdCapabilityUpdateRequest
): Promise<BundleIdCapabilityResponse> {
    return PATCH(api, `/bundleIdCapabilities/${id}`, { body })
}
