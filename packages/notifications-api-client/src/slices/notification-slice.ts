import { StateCreator, create } from 'zustand';
import { fetchNotificationByUserId, fetchNotifications } from '../api/fetch-notifications';
import { INotification } from '../models/notification';
import { INotificationParams } from '../models/parameters/notification';
import { NotificationState } from '../store';
import { ApiError } from 'commons-api-client';




/**
 * Creates a notification slice for the store.
 * @param {StateSetter<NotificationState>} set - The setter function provided by Zustand.
 * @returns {NotificationSlice} The notification slice object.
 */
export const createNotificationSlice: StateCreator<NotificationState> = (set) => ({
  notifications: [],
  loading: false,
  error: null,
  getNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchNotifications();
      if (response instanceof ApiError) {
        console.log(response)
        throw response;
      }
      set({ notifications: response as INotification[], loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error : error instanceof Error ? error : new Error('An unknown error occurred');
      set({ notifications: [], loading: false, error: errorMessage });
    }
  },
  getNotificationByUserId: async (params: INotificationParams) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchNotificationByUserId(params);
      if (response instanceof ApiError) {
        throw response;
      }
      set({ notifications: response as INotification[], loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error : error instanceof Error ? error : new Error('An unknown error occurred');
      set({ notifications: [], loading: false, error: errorMessage });
    }
  },
});




