import { ApiError, CommonParams, ApiResponse } from 'commons-api-client';
import { fetchNotifications } from '../api/fetch-notifications';
import config from '../config';
import { INotification } from '../models/notification';
import notificationStore, { notificationStoreNoPersistence } from '../store';

/**
 * Fetches notifications based on the provided parameters.
 * 
 * @param {CommonParams} params - An object of parameters used to control fetching behavior.
 * @param {boolean} params.reloadData - If true, always fetch new data. If false, use existing data if available.
 * 
 * @returns {Promise<ApiResponse<INotification[], null>>} A promise that resolves to an object containing notifications data,
 * loading status, any errors that occurred during the fetch, and optional metadata.
 */
export async function getNotifications(params: CommonParams): Promise<ApiResponse<INotification[], null>> {
  // Get the appropriate state, either persistent or non-persistent based on configuration.
  const store = config(params).STATE_NO_PERSISTENT ? notificationStoreNoPersistence : notificationStore;

  const state = store.getState()
  // If reloadData is true or if notifications array is empty, fetch new notifications.
  if (params.reloadData || !state.notifications || state.notifications.length === 0) {
    await state.getNotifications();
  }

  // Get the updated state after potentially fetching new data.
  const { notifications, loading, error } = state;

  // Return an object containing the notifications data, loading status, and any errors.
  return { payload: notifications, meta: null, error, loading };
}



/**
 * Retrieves notifications without using the store.
 * @returns {Promise<ApiResponse<INotification[], null>>} A promise that resolves to the API response containing the notifications.
 */
export async function getNotificationsNoStore(): Promise<ApiResponse<INotification[], null>> {
  let loading = true;
  let error: string | null = null;

  const fetchNotif = await fetchNotifications();

  if (fetchNotif instanceof ApiError) {
    return { payload: null, meta: null, error: fetchNotif, loading };
  } else {
    return { payload: fetchNotif, meta: null, error, loading };
  }
}