import { IsNumberString, IsInt } from 'class-validator';

export class PaymentDTO {
  @IsInt()
  userId: number;

  @IsInt()
  orderId: number;

  @IsNumberString()
  value: string;

  constructor(userId: number, orderId: number, value: string) {
    this.userId = userId;
    this.orderId = orderId;
    this.value = value;
  }
}
