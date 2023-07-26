import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum NotificationType {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum NotificationStatus {
  NEW = 'new',
  READ = 'read',
}

@Entity()
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  notificationId: number;

  @Column()
  userId: number;

  @Column()
  text: string;

  @Column()
  status: string; // Unfortunately, SQLite doesn't support enums! We will validate the values using the service.

  @Column()
  notificationType: string; // Unfortunately, SQLite doesn't support enums! We will validate the values using the service.

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // Change the type to 'datetime'
  created_at: Date;
}
