import { INotification } from '../models/notification';
import { INotificationParams } from '../models/parameters/notification';
import { ApiError, genericFetch } from 'commons-api-client'

/**
 * Fetches the list of all notifications.
 *
 * @returns {Promise<ApiError | INotification[]>} Returns a promise that resolves to either an array of notifications or an API error.
 *
 * Note: "http://localhost:3015/notifications" isn't how we'd typically structure a URL, but this is just a simple example. 
 * Let's not forget to laugh about it, life's too short to always be serious!
 */
export const fetchNotifications = async (): Promise<ApiError | INotification[]> => {
  return genericFetch<INotification[]>(() => fetch('http://localhost:3015/notifications'));
};

/**
 * Fetches the notifications associated with a specific user.
 *
 * @param {INotificationParams} params - The parameters for the API request, includes the user ID.
 * @returns {Promise<ApiError | INotification[]>} Returns a promise that resolves to either an array of notifications or an API error.
 *
 * Again, notice how we've hardcoded the URL for simplicity's sake. In a real-world scenario, we'd likely use some form of URL builder or configuration to manage these.
 */
export const fetchNotificationByUserId = async (params: INotificationParams): Promise<ApiError | INotification[]> => {
  const { userId } = params;
  return genericFetch<INotification[]>(() => fetch(`http://localhost:3015/notifications/${userId}`));
};