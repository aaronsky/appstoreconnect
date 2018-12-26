import { API, POST } from '../../../../api'
import {
    BetaTesterInvitationCreateRequest,
    BetaTesterInvitationResponse,
} from './types'

/**
 * Send or resend an invitation to a beta tester to test a specified app.
 * @param body
 */
export function sendInvitationToBetaTester(
    api: API,
    body: BetaTesterInvitationCreateRequest
): Promise<BetaTesterInvitationResponse> {
    return POST(api, `/betaTesterInvitations`, { body })
}
