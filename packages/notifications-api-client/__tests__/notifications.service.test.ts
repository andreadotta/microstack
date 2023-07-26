import { jest, expect, describe, it } from '@jest/globals';
import { getNotifications,  } from '../src/services/notification-services';
// Define the type for the test notifications
import fetchMock from 'jest-fetch-mock';
import { notificationStoreNoPersistence } from '../src/store';

describe('getNotifications', () => {
  it('should call fetchNotifications and return notifications', async () => {
    console.log(JSON.stringify(notificationStoreNoPersistence.getState()));

    const mockNotifications = [{
      notificationId: 1,
      userId: 1,
      text: 'Test notification',
      notificationType: 'info',
      status: 'unread',
      created_at: new Date().toISOString()  // Convert to string
    }];

    fetchMock.mockResponseOnce(JSON.stringify(mockNotifications));

    const fetchSpy = jest.spyOn(notificationStoreNoPersistence.getState(), 'getNotifications');

    const mockParams = {
      debugMode: true,
      useMock: true,
    };


    await getNotifications(mockParams); // Attendiamo l'esecuzione di getNotifications.

    const { notifications, loading, error } = notificationStoreNoPersistence.getState();

    expect(fetchSpy).toHaveBeenCalled();
    expect(notifications).toEqual(mockNotifications);
    expect(loading).toBeFalsy();
    expect(error).toBeNull();
  });


});

