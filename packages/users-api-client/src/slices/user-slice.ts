import { StateCreator, create } from 'zustand';
import { UserState } from '../store';
import { fetchUsers } from '../api/fetch-users';
import { ApiError } from 'commons-api-client/*';

/**
 * Creates a user slice for the store.
 * @param {StateSetter<UserState>} set - The setter function provided by Zustand.
 * @returns {UserSlice} The user slice object.
 */
export const createUserSlice: StateCreator<UserState> = (set) => ({
  users: [],
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchUsers();
      if (response instanceof ApiError) {
        throw response;
      }
      set({ users: response as IUser[], loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error : error instanceof Error ? error : new Error('An unknown error occurred');
      set({ users: [], loading: false, error: errorMessage });
    }
  },
});