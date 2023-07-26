import {
  NotificationType,
  NotificationStatus,
} from '../notification.entity/notification.entity';

export class CreateNotificationDto {
  userId: number;
  text: string;
  notificationType: NotificationType;
  status: NotificationStatus;
}
