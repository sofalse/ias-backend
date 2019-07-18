import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderDTO } from './order.dto';
import { OrderService } from './order.service';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Body('data') data: OrderDTO) {
    return this.orderService.createOne(data);
  }
}
