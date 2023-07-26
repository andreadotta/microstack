import { jest, expect, describe, it } from '@jest/globals';
import { getUsers } from '../src/services/user-services';
import fetchMock from 'jest-fetch-mock';
import userStore from '../src/store';
/**
 * Test case for the `getUsers` function.
 *
 * @remarks
 * This test checks if the `getUsers` function calls `fetchUsers` and returns users correctly.
 *
 * @param {function} jest - The Jest testing framework.
 * @param {function} expect - The Jest expect function.
 * @param {function} describe - The Jest `describe` function.
 * @param {function} it - The Jest `it` function.
 */
describe('getUsers', () => {
  it('should call fetchUsers and return users', async () => {
    // Mock users data
    const mockUsers = [{
      id: 1,
      name: 'Test User',
      surname: 'UserSurname',
      email: 'user@test.com',
      phone: '1234567890'
    }];

    // Mock the fetch response with the users data
    fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

    // Spy on fetchUsers function
    const fetchSpy = jest.spyOn(userStore.getState(), 'fetchUsers');

    // Mock parameters
    const mockParams = {
      debugMode: true,
      useMock: true,
    };

    // Call the getUsers function
    await getUsers(mockParams);

    // Get the state from the userStore after the function call
    const { users, loading, error } = userStore.getState();

    // Perform assertions
    expect(fetchSpy).toHaveBeenCalled();
    expect(users).toEqual(mockUsers);
    expect(loading).toBeFalsy();
    expect(error).toBeNull();
  });
});
