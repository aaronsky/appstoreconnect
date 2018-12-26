import { API, GET } from '../../../api'
import { GetFinanceReportsQuery, GetSalesReportsQuery } from './types'

/**
 * Download finance reports filtered by your specified criteria.
 * @param query
 */
export function downloadFinancialReports(
    api: API,
    query: GetFinanceReportsQuery
): Promise<Buffer> {
    return GET(api, '/financeReports', { query })
}

/**
 * Download sales and trends reports filtered by your specified criteria.
 * @param query
 */
export function downloadSalesReports(
    api: API,
    query: GetSalesReportsQuery
): Promise<Buffer> {
    return GET(api, '/salesReports', { query })
}
