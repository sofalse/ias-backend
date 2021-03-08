import {
  Controller,
  Post,
  HttpCode,
  Body,
  HttpStatus,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDTO } from './payment.dto';

@Controller('/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Body('data') data: PaymentDTO) {
    return this.paymentService.createOne(data);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async execute(@Param('id') id: number) {
    this.paymentService.execute(id);
  }

  @Get('/nbprate')
  @HttpCode(HttpStatus.OK)
  async getNBP() {
    this.paymentService.getNBP();
  }
}
