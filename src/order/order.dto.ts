import { IsArray, IsInt } from 'class-validator';

export class OrderDTO {
  @IsArray()
  itemsIds: number[];

  @IsInt()
  userId: number;

  constructor(itemsIds: number[], userId: number) {
    this.itemsIds = itemsIds;
    this.userId = userId;
  }
}
