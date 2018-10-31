import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post()
  async createUser(@Body() body) {
    return this.userService.createOne(body.data);
  }
}
