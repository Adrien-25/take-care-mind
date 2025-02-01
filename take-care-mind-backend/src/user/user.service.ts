import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Injectez le repository
  ) {}

  async findById(userId: string): Promise<User | undefined> {
    const userIdInt = parseInt(userId, 10);
    return this.userRepository.findOne({ where: { id: userIdInt } });
  }
}
