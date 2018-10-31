import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createOne(user: User): Promise<User> {
    if (!user.password) throw new BadRequestException('Password is required');
    const hashedPassword = await hash(user.password, 6);
    const userDTO: User = {
      ...user,
      password: hashedPassword,
    };
    return this.userRepository.save(userDTO);
  }
}
