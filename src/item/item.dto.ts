import {
  IsString,
  IsOptional,
  IsNumberString,
  MaxLength,
  IsCurrency,
} from 'class-validator';

export class ItemDTO {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  description: string | null;

  @IsNumberString()
  price: string;

  @IsCurrency()
  currency: string;

  constructor(
    name: string,
    description: string | null,
    price: string,
    currency: string,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.currency = currency;
  }
}
