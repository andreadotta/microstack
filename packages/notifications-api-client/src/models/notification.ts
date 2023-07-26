export interface INotification {
  notificationId: number;

  userId: number;

  text: string;

  notificationType: string;

  status: string;  

  created_at: Date;
}

export const notificationInit: INotification = {
  notificationId: 0,
  userId: 0,
  text: "",
  notificationType: "type",
  status: "",
  created_at: new Date(),
};