import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Item } from 'item/item.entity';
import { User } from 'user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Item, User])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
