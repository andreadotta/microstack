import { useMemo } from 'react';
import { useNotifications } from '../hooks/use-notifications';

interface NotificationsProps {
  styles: {
    readonly [key: string]: string;
  };
}

const Notifications = ({ styles }: NotificationsProps) => {
  const params = useMemo(() => ({ reloadData: true }), []);
  const { data, loading, error } = useNotifications(params);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  const renderFooter = (status: string) => {
    let buttonText = 'Mark as unread';
    let buttonClass = 'unread';

    if (status === 'new') {
      buttonText = 'Mark as read';
      buttonClass = 'read';
    }

    return status === 'new' ? (
      <div className={styles['notification-footer']}>
        <button className={`${styles['mark-button']} ${styles[buttonClass]}`}>{buttonText}</button>
      </div>
    ) : null;
  };


  const timeSince = (date: Date): string => {
    const now = new Date();
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    if (secondsPast < 3600) {
      return `${Math.round(secondsPast / 60)} minutes ago`;
    }

    if (secondsPast < 86400) {
      return `${Math.round(secondsPast / 3600)} hours ago`;
    }

    const daysPast = Math.round(secondsPast / 86400);
    if (daysPast > 48) {
      return `${daysPast} days ago`;
    }
    return '2 days ago';
  };

  const getBadgeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'high':
        return `${styles['notification-type-badge']} ${styles['notification-type-badge-high']}`;
      case 'medium':
        return `${styles['notification-type-badge']} ${styles['notification-type-badge-medium']}`;
      case 'low':
        return `${styles['notification-type-badge']} ${styles['notification-type-badge-low']}`;
      default:
        return styles['notification-type-badge'];
    }
  };

  return (
    <div className={styles['notifications-wrapper']}>
      <main className={styles['notification-container']}>
        {data && data.length > 0 ? (
          <ul className='w-full flex flex-col items-center'>
            {data.map((notification, index) => (
              <li key={index} className={styles['notification-item']}>
                <span className={getBadgeStyle(notification.notificationType)}>
                  {notification.notificationType}
                </span>
                <p className={styles['created-at']}>
                  {timeSince(new Date(notification.created_at))}
                </p>
                <p>Notification ID: {notification.notificationId}</p>
                <p>User ID: {notification.userId}</p>
                <p>Text: {notification.text}</p>
               {renderFooter(notification.status)}
              </li>
            ))}
          </ul>
        ) : (
          'No Notifications'
        )}
      </main>
    </div>
  );
};

export default Notifications;
