import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { ItemDTO } from './item.dto';
import { PaginationParams } from 'common/pagination.interface';
import { PaymentService } from 'payment/payment.service';

export interface CurrencyChangeDTO {
  itemId: number;
  oldCurrency: string;
  newCurrency: string;
  oldPrice: number;
}

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
    private readonly paymentService: PaymentService,
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

  async currencyChange(currencyChangeDTO: CurrencyChangeDTO) {
    const item = await this.itemRepository.findOne(currencyChangeDTO.itemId);
    if (!item) {
      throw new HttpException('Invalid item', HttpStatus.NOT_FOUND);
    }

    const nbpApi = await this.paymentService.getNBP();

    for (const rate of nbpApi[0].rates) {
      if (currencyChangeDTO.oldCurrency === 'PLN') {
        if (rate.code === currencyChangeDTO.newCurrency) {
          const newValue = currencyChangeDTO.oldPrice / rate.mid;

          await this.itemRepository.update(currencyChangeDTO.itemId, {
            currency: currencyChangeDTO.newCurrency,
            price: newValue.toString(),
          });
        }
      } else if (rate.code === currencyChangeDTO.oldCurrency) {
        const newValue = currencyChangeDTO.oldPrice * rate.mid;
        if (currencyChangeDTO.newCurrency !== 'PLN') {
          for (const anotherRate of nbpApi[0].rates)
            if (anotherRate.code === currencyChangeDTO.newCurrency) {
              const notPLNValue = newValue / anotherRate.mid;

              await this.itemRepository.update(currencyChangeDTO.itemId, {
                currency: currencyChangeDTO.newCurrency,
                price: notPLNValue.toString(),
              });
            }
        } else {
          await this.itemRepository.update(currencyChangeDTO.itemId, {
            currency: currencyChangeDTO.newCurrency,
            price: newValue.toString(),
          });
        }
      }
    }
  }
}
