import { CommonParams } from 'commons-api-client';

/**
 * Interface representing the parameters for fetching notifications.
 * Includes the common parameters (inherited from CommonParams) and an additional userId parameter.
 * This interface provides a structured way to pass input parameters for fetching notifications.
*/
export interface INotificationParams extends CommonParams {
  userId: string;
}