/**
 * The CommonParams interface describes the shared parameters used across
 * multiple functions within the application. These parameters control certain
 * application behaviors.
 */
export interface CommonParams {
  /**
   * A debugMode flag that, when true, triggers additional logging or other
   * debug features within the application. Defaults to false.
   */
  debugMode?: boolean;

  /**
   * A useMock flag that, when true, forces the application to use mock data
   * instead of making actual API calls. This can be useful for testing or
   * developing when the API is not available. Defaults to false.
   */
  useMock?: boolean;

  /**
   * A reloadData flag that, when true, forces the application to bypass
   * any cached data and fetch fresh data from the API. This can be useful
   * when the data may have changed and the application needs to ensure it
   * has the latest data. Defaults to false.
   */
  reloadData?: boolean;
}
