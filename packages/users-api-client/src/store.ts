import { ApiError } from 'commons-api-client/*';
import { createUserSlice } from './slices/user-slice';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export interface UserState {
  users: IUser[];
  loading: boolean;
  error: ApiError | Error | null;
  fetchUsers: () => Promise<void>;
}

const userStore = create(
  persist(
    createUserSlice,
    { name: 'slice-user-store' } // your persist configuration
  )
);


export const userStoreNoPersistence = create<UserState>(createUserSlice);

export default userStore;


