import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { PaymentService } from 'payment/payment.service';
import { Payment } from 'payment/payment.entity';
import { Order } from 'order/order.entity';
import { User } from 'user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Payment, User, Order])],
  controllers: [ItemController],
  providers: [ItemService, PaymentService],
})
export class ItemModule {}
