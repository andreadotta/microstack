import React from 'react';
// pages/index.js
import dynamic from 'next/dynamic';

import styles from '../styles/notifications.module.css';

interface NotificationsProps {
  styles: {
    readonly [key: string]: string;
  };
}

// Utilizza il componente remoto "UsersPage"
const Notifications = dynamic<NotificationsProps>(() => import('users/Notifications'), {
  ssr: false,  
})

const NotificationsComponent = () => {
  return <>
  <div>Main App</div>
  <Notifications styles={styles} /></>;
};



export default NotificationsComponent;