import {
  Controller,
  Post,
  Body,
  HttpCode,
  Patch,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService, EmailChangeDTO, PasswordChangeDTO } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post()
  async createUser(@Body('data') data: UserDTO) {
    return this.userService.createOne(data);
  }

  @HttpCode(200)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @HttpCode(200)
  @Get('/:id')
  async getOne(@Param('id') id: number) {
    if (isNaN(id)) {
      throw new HttpException(
        'Enter number for user id',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.getUser(id);
  }

  @HttpCode(204)
  @Patch()
  async changePassword(@Body('data') data: PasswordChangeDTO) {
    await this.userService.updatePassword(data);
  }

  @HttpCode(204)
  @Patch()
  async changeEmail(@Body('data') data: EmailChangeDTO) {
    await this.userService.updateEmail(data);
  }
}
