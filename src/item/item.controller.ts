import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  HttpException,
  Patch,
} from '@nestjs/common';
import { ItemDTO } from './item.dto';
import { ItemService, CurrencyChangeDTO } from './item.service';

@Controller('/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('page') page = 1, @Query('perPage') perPage = 15) {
    if ([page, perPage].find(isNaN)) {
      throw new HttpException(
        'Pagination must be valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.itemService.findAll({ page, perPage: Math.ceil(perPage) });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOne(@Body('data') data: ItemDTO) {
    return this.itemService.createOne(data);
  }

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async currencyChaange(@Body('data') data: CurrencyChangeDTO) {
    this.itemService.currencyChange(data);
  }
}
