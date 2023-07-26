import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { usersInitDb } from './users.initdb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createSampleUsers(): Promise<User[]> {
    const userEntities = this.usersRepository.create(usersInitDb); // Use users data from users.ts

    return this.usersRepository.save(userEntities);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
