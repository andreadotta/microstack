import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @Post('createSampleNotifications')
  createSampleNotifications() {
    return this.notificationsService.createSampleNotifications();
  }
  @Get()
  async getNotifications() {
    return this.notificationsService.getNotifications();
  }

  @Get(':userId')
  async getNotificationsByUserId(@Param('userId') userId: number) {
    return this.notificationsService.getNotificationsByUserId(userId);
  }

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @Post(':notificationId/mark-as-read')
  async markNotificationAsRead(
    @Param('notificationId') notificationId: number,
  ) {
    return this.notificationsService.markNotificationAsRead(notificationId);
  }
}
