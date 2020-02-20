import { API, DELETE, GET, PATCH, POST } from '../../../../api'
import {
    CertificateCreateRequest,
    CertificateResponse,
    CertificatesResponse,
    CertificateType,
} from './types'

/**
 * Create a new certificate using a certificate signing request.
 */
export async function createCertificate(
    api: API,
    body: CertificateCreateRequest
): Promise<CertificateResponse> {
    return POST(api, '/certificates', { body })
}

/**
 * Find and list certificates and download their data.
 */
export async function listAndDownloadCertificates(
    api: API,
    query: ListAndDownloadCertificatesQuery
): Promise<CertificatesResponse> {
    return GET(api, '/certificates', { query })
}

/**
 * Get information about a certificate and download the certificate data.
 */
export async function readAndDownloadCertificateInformation(
    api: API,
    id: string,
    query: ReadAndDownloadCertificateInformationQuery
): Promise<CertificateResponse> {
    return GET(api, `/certificates/${id}`, { query })
}

/**
 * Get information about a certificate and download the certificate data.
 */
export async function revokeCertificate(api: API, id: string): Promise<void> {
    return DELETE(api, `/certificates/${id}`)
}

export type CertificatesType =
    | 'certificateContent'
    | 'certificateType'
    | 'csrContent'
    | 'displayName'
    | 'expirationDate'
    | 'name'
    | 'platform'
    | 'serialNumber'

export type ListAndDownloadCertificatesSortOption =
    | 'certificateType'
    | '-certificateType'
    | 'displayName'
    | '-displayName'
    | 'id'
    | '-id'
    | 'serialNumber'
    | '-serialNumber'

export interface ListAndDownloadCertificatesQuery {
    fields?: {
        certificates?: CertificatesType[]
    }
    filter?: {
        id?: string[]
        serialNumber?: string[]
        certificateType?: CertificateType[]
        displayName?: string[]
    }
    limit?: number
    sort?: ListAndDownloadCertificatesSortOption[]
}

export interface ReadAndDownloadCertificateInformationQuery {
    fields?: {
        certificates?: CertificatesType[]
    }
}
