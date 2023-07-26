interface INotificationResponse {
  notificationId: number;

  userId: number;

  text: string;

  meta: {
    
    notificationType: string;

    status: string;  
  }

  created_at: Date;
}
export default INotificationResponse;