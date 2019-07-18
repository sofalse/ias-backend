import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'order/order.entity';
import { User } from 'user/user.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './payment.entity';
import { Item } from 'item/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, User, Item])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
