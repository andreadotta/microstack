import {
  NotificationType,
  NotificationStatus,
} from './notification.entity/notification.entity';

export const notificationsInitDb = [
  {
    userId: 1,
    text: 'Sample notification 1',
    notificationType: NotificationType.HIGH,
    status: NotificationStatus.NEW,
  },
  {
    userId: 2,
    text: 'Sample notification 2',
    notificationType: NotificationType.MEDIUM,
    status: NotificationStatus.NEW,
  },
  {
    userId: 1,
    text: 'Sample notification 3',
    notificationType: NotificationType.LOW,
    status: NotificationStatus.NEW,
  },
  {
    userId: 2,
    text: 'Sample notification 4',
    notificationType: NotificationType.HIGH,
    status: NotificationStatus.NEW,
  },
  {
    userId: 1,
    text: 'Sample notification 5',
    notificationType: NotificationType.MEDIUM,
    status: NotificationStatus.NEW,
  },
];
