import { ApiError, genericFetch } from 'commons-api-client/*';

/**
 * Fetches the list of all users.
 *
 * @returns {Promise<ApiError | IUser[]>} Returns a promise that resolves to either an array of users or an API error.
 *
 * As a side note, just like in our previous functions, we're using a hard-coded URL here. This is just for simplicity's sake 
 * and definitely not what we'd do in a production environment.
 */
export const fetchUsers = async (): Promise<ApiError | IUser[]> => {
  return genericFetch<IUser[]>(() => fetch('http://localhost:3011/users'));
};