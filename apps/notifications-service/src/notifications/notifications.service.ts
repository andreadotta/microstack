import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  NotificationEntity,
  NotificationStatus,
} from './notification.entity/notification.entity';
import { notificationsInitDb } from './notifications.initdb';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationsRepository: Repository<NotificationEntity>,
  ) {}

  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationEntity> {
    const { text, notificationType } = createNotificationDto;

    const notification = new NotificationEntity();
    notification.text = text;
    notification.notificationType = notificationType;
    notification.status = NotificationStatus.NEW;

    return this.notificationsRepository.save(notification);
  }
  async markNotificationAsRead(
    notificationId: number,
  ): Promise<NotificationEntity> {
    try {
      const notification = await this.notificationsRepository.findOneOrFail({
        where: { notificationId },
      });
      notification.status = NotificationStatus.READ;
      return this.notificationsRepository.save(notification);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Notification not found');
      }
      throw error;
    }
  }

  async getNotificationsByUserId(
    userId: number,
  ): Promise<NotificationEntity[]> {
    return this.notificationsRepository.find({ where: { userId } });
  }

  async createSampleNotifications(): Promise<NotificationEntity[]> {
    const notificationEntities = notificationsInitDb.map((notificationData) => {
      const notification = new NotificationEntity();
      notification.userId = notificationData.userId;
      notification.text = notificationData.text;
      notification.notificationType = notificationData.notificationType;
      notification.status = notificationData.status;
      return notification;
    });

    return this.notificationsRepository.save(notificationEntities);
  }

  async checkUserExists(userId: string): Promise<boolean> {
    try {
      // Alright, let's wire up the address of the other service like this... just kidding! 😄
      // Okay, but remember, this is just an example... well, connecting two services via REST isn't all that glamorous either! 😉
      const response = await fetch(`http://user-service/api/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        // Controlla se la risposta contiene i dettagli dell'utente
        const userExists = userData && userData.userId;
        return userExists;
      } else {
        // Gestisci l'errore nel caso in cui la richiesta non abbia avuto successo
        console.error(
          "Errore durante la verifica dell'esistenza dell'utente. Status:",
          response.status,
        );
        return false;
      }
    } catch (error) {
      // Gestisci l'errore in caso di problemi nella richiesta o risposta
      console.error(
        "Errore durante la verifica dell'esistenza dell'utente:",
        error,
      );
      return false;
    }
  }

  async getNotifications(): Promise<NotificationEntity[]> {
    return await this.notificationsRepository.find();
  }
}
