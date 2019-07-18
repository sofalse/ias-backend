import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { ItemDTO } from './item.dto';
import { PaginationParams } from 'common/pagination.interface';

export interface FindAllItems {
  data: Item[];
  meta: {
    total: number;
  };
}

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(paginationParams: PaginationParams): Promise<FindAllItems> {
    const [items, itemsCount] = await this.itemRepository
      .createQueryBuilder()
      .skip((paginationParams.page - 1) * paginationParams.perPage)
      .take(paginationParams.perPage)
      .getManyAndCount();
    return {
      data: items,
      meta: {
        total: itemsCount,
      },
    };
  }

  async createOne(data: ItemDTO): Promise<Item> {
    return this.itemRepository.save(data);
  }
}
