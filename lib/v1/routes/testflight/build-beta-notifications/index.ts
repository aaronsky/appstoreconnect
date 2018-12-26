import {
    BuildBetaNotificationCreateRequest,
    BuildBetaNotificationResponse,
} from './types'
import v1 from '../../..'

/**
 * Send a notification to all assigned beta testers that a build is available for testing.
 * @param body
 */
export function sendNotificationOfAvailableBuild(
    body: BuildBetaNotificationCreateRequest
): Promise<BuildBetaNotificationResponse> {
    return v1.POST('/buildBetaNotifications', { body })
}
