import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ItemModule } from 'item/item.module';
import { OrderModule } from 'order/order.module';
import { PaymentModule } from 'payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ItemModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
