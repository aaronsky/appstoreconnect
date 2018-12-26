import { API, POST } from '../../../../api'
import {
    BuildBetaNotificationCreateRequest,
    BuildBetaNotificationResponse,
} from './types'

/**
 * Send a notification to all assigned beta testers that a build is available for testing.
 * @param body
 */
export function sendNotificationOfAvailableBuild(
    api: API,
    body: BuildBetaNotificationCreateRequest
): Promise<BuildBetaNotificationResponse> {
    return POST(api, '/buildBetaNotifications', { body })
}
