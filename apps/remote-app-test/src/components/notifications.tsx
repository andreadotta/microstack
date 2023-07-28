import { useMemo } from 'react';
import { useNotifications } from '../hooks/use-notifications';
interface NotificationsProps {
  styles: {
    readonly [key: string]: string;
  };
}
const Notifications = ({ styles }: NotificationsProps) => {
  const params = useMemo(() => ({ reloadData: true }), []); // Aggiungi le dipendenze necessarie
  const { data, loading, error } = useNotifications(params); // Ad esempio, forziamo il recupero dei dati. Modifica i parametri come necessario.

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <main className={`${styles} notification-container`}>
      {data && data.length > 0 ? (
        <ul>
          {data.map((notification, index) => (
            <li key={index} className={styles['notification-item']}>
              <p>Notification ID: {notification.notificationId}</p>
              <p>User ID: {notification.userId}</p>
              <p>Text: {notification.text}</p>
              <p>Notification Type: {notification.notificationType}</p>
              <p>Status: {notification.status}</p>
              <p>Created At: {notification.created_at.toString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        'No Notifications'
      )}
    </main>
  );
};

export default Notifications;
