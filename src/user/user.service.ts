import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { UserDTO } from './user.dto';

export interface PasswordChangeDTO {
  oldPassword: string;
  newPassword: string;
  userId: number;
}

export interface EmailChangeDTO {
  userId: number;
  newEmail: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createOne(user: UserDTO): Promise<User> {
    if (!user.password) throw new BadRequestException('Password is required');
    const hashedPassword = await hash(user.password, 6);
    const userDTO: UserDTO = {
      ...user,
      password: hashedPassword,
    };
    return this.userRepository.save(userDTO);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder()
      .where('id=:id', { id })
      .getOne();
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.createQueryBuilder().getMany();
  }

  async updatePassword(passwordChangeDTO: PasswordChangeDTO) {
    const user = await this.getUser(passwordChangeDTO.userId);
    if (!user) {
      throw new HttpException(
        `no user of id ${passwordChangeDTO.userId}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const match = await compare(passwordChangeDTO.oldPassword, user.password);
    if (!match) throw new ForbiddenException('Invalid password');

    const hashedPassword = await hash(passwordChangeDTO.newPassword, 6);

    await this.userRepository.update(passwordChangeDTO.userId, {
      password: hashedPassword,
    });
  }

  async updateEmail(emailChangeDTO: EmailChangeDTO) {
    await this.userRepository.update(emailChangeDTO.userId, {
      email: emailChangeDTO.newEmail,
    });
  }
}
