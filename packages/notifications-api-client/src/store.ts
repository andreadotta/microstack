import { create } from 'zustand';
import { createNotificationSlice } from './slices/notification-slice';
import { persist } from 'zustand/middleware'
import { INotification } from './models/notification';
import { INotificationParams } from './models/parameters/notification';
import { ApiError } from 'commons-api-client';


export interface NotificationState {
  notifications: INotification[];
  loading: boolean;
  //An error message, if any, occurred during the notification fetching process.
  error: ApiError | Error | null;
  getNotifications: () => Promise<void>;
  getNotificationByUserId: (params: INotificationParams) => Promise<void>;
  }


const notificationStore = create(
  persist(
    createNotificationSlice,
    { name: 'notification-slice-store' } // your persist configuration
  )
);


export const notificationStoreNoPersistence = create<NotificationState>(createNotificationSlice);

export default notificationStore;