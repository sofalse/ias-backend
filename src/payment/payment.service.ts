import axios from 'axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { PaymentDTO } from './payment.dto';
import { User } from 'user/user.entity';
import { Order } from 'order/order.entity';
import { Item } from 'item/item.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async createOne(data: PaymentDTO): Promise<Payment> {
    const [order, user] = await Promise.all([
      this.orderRepository.findOne(data.orderId),
      this.userRepository.findOne(data.userId),
    ]);

    if (!user || !order) {
      throw new HttpException('Invalid user or order', HttpStatus.NOT_FOUND);
    }

    return this.paymentRepository.save({
      user,
      order,
      isPayed: false,
      value: data.value,
    });
  }

  async execute(paymentId: number) {
    const payment = await this.paymentRepository.findOne(paymentId);

    if (!payment) {
      throw new HttpException('Invalid payment', HttpStatus.NOT_FOUND);
    }

    await this.paymentRepository.update(paymentId, { isPayed: true });
  }

  async getNBP() {
    try {
      const { data } = await axios.get(
        'http://api.nbp.pl/api/exchangerates/tables/A/',
      );
      return data;
    } catch (err) {
      throw new HttpException(err, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
