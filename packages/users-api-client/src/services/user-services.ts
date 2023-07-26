import config from '../config';
import { fetchUsers } from '../api/fetch-users';
import userStore, { userStoreNoPersistence } from '../store';
import { ApiError, ApiResponse, CommonParams } from 'commons-api-client';

/**
 * Retrieves users using the user service and Zustand store.
 * @param {CommonParams} params - The common parameters for fetching users.
 * @returns {Promise<ApiResponse<IUser[], null>>} A promise that resolves to the API response containing the users.
 */
export async function getUsers(params: CommonParams): Promise<ApiResponse<IUser[], null>> {
    // Get the appropriate state, either persistent or non-persistent based on configuration.
    const store = config(params).STATE_NO_PERSISTENT ? userStoreNoPersistence : userStore;

    const state = store.getState()
    // If reloadData is true or if users array is empty, fetch new users.
    if (params.reloadData || !state.users || state.users.length === 0) {
      await state.fetchUsers();
    }
  
    // Get the updated state after potentially fetching new data.
    const { users, loading, error } = state;
  
    // Return an object containing the users data, loading status, and any errors.
    return { payload: users, meta: null, error, loading };
  }
  

/**
 * Retrieves users without using the store.
 * @returns {Promise<ApiResponse<IUser[], null>>} A promise that resolves to the API response containing the users.
 */
export async function getUsersNoStore(): Promise<ApiResponse<IUser[], null>> {
  let loading = true;
  let error: string | null = null;

  const fetchUsersResult = await fetchUsers();

  if (fetchUsersResult instanceof ApiError) {
    return { payload: null, meta: null, error: fetchUsersResult, loading };
  } else {
    return { payload: fetchUsersResult, meta: null, error, loading };
  }
}
