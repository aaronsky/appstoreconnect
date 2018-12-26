import {
    BetaTesterInvitationCreateRequest,
    BetaTesterInvitationResponse,
} from './types'
import v1 from '../../..'

/**
 * Send or resend an invitation to a beta tester to test a specified app.
 * @param body
 */
export function sendInvitationToBetaTester(
    body: BetaTesterInvitationCreateRequest
): Promise<BetaTesterInvitationResponse> {
    return v1.POST(`/betaTesterInvitations`, { body })
}
