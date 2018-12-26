import { API } from '../../api'
import * as testflight from './testflight'
import * as users from './users'
import * as userInvitations from './user-invitations'
import * as financeReports from './finance-reports'

export function routes(api: API) {
    api.routes('testflight', testflight)
    api.routes('users', users)
    api.routes('userInvitations', userInvitations)
    api.routes('financeReports', financeReports)
}
