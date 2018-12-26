import { Gunzip } from 'zlib'
import api from '../../'
import { GetFinanceReportsQuery, GetSalesReportsQuery } from './types'

/**
 * Download finance reports filtered by your specified criteria.
 * @param query
 */
export function downloadFinancialReports(
    query: GetFinanceReportsQuery
): Promise<Gunzip> {
    return api.GET('/financeReports', { query })
}

/**
 * Download sales and trends reports filtered by your specified criteria.
 * @param query
 */
export function downloadSalesReports(
    query: GetSalesReportsQuery
): Promise<Gunzip> {
    return api.GET('/salesReports', { query })
}
