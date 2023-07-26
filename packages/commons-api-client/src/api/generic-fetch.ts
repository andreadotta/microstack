import { ApiError } from './api-error';

/**
 * Generic function for fetching data from an API.
 * @param {() => Promise<Response>} fetchFunction - The fetch function to be executed.
 * @returns {Promise<ApiError | T>} A promise that resolves to the fetched data or an error.
 * @template T - The type of the data to be fetched.
 */
export const genericFetch = async <T>(fetchFunction: () => Promise<Response>): Promise<ApiError | T> => {
  try {
    const response = await fetchFunction();
    if (response.ok) {
      return response.json();
    } else {
      const errorMessage = await response.text();
      return new ApiError('Error fetching data', response.status, errorMessage);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new ApiError('FetchData: An unknown error occurred', 500, errorMessage);
  }
};
