import {
  Controller,
  Post,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('createSampleUsers')
  createSampleUsers() {
    return this.usersService.createSampleUsers();
  }
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
