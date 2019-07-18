import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDTO } from './order.dto';
import { Item } from 'item/item.entity';
import { User } from 'user/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createOne({ itemsIds, userId }: OrderDTO) {
    const [items, user] = await Promise.all([
      this.itemRepository
        .createQueryBuilder()
        .whereInIds(itemsIds)
        .getMany(),
      this.userRepository.findOne(userId),
    ]);

    if (!user || !items.length) {
      throw new Error('Invalid user or no items chosen');
    }

    return this.orderRepository.save({ items, user });
  }
}
