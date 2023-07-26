export interface ApiResponse<T, V> {
  payload: T | null;
  meta: V;
  error: Error | string | null;
  loading: boolean;
}