export interface ApiRequest<T, V> {
  params: T;
  meta: V;

  env: {
    debug: boolean,
    env: 'prod' | 'dev';
  }
}