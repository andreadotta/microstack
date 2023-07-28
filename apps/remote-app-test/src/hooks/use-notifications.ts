import { ApiError, CommonParams } from 'commons-api-client';
import { INotification, getNotifications } from 'notifications-api-client';
import { useEffect, useState } from 'react';

/**
 * Custom hook to fetch notifications
 * @param {CommonParams} params - The common parameters.
 */
export function useNotifications(params: CommonParams) {
  const [data, setData] = useState<INotification[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {

      setLoading(true);
      try {
        const response = await getNotifications(params);
        response.error ? setError(response.error as ApiError) : setData(response.payload)
      } catch (e) {
        console.log(e)
        setError(e as Error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [, params]); // Aggiungi hasError come dipendenza

  return { data, loading, error };
}
