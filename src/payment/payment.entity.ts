import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'user/user.entity';
import { Order } from 'order/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(type => User)
  user: User;

  @OneToOne(type => Order)
  order: Order;

  @Column({
    type: 'decimal',
    scale: 2,
    precision: 9,
    nullable: false,
  })
  value: string;

  @Column({
    type: 'tinyint',
    width: 1,
  })
  isPayed: boolean;

  @CreateDateColumn()
  payedAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(user: User, order: Order, value: string, isPayed: boolean) {
    this.order = order;
    this.user = user;
    this.value = value;
    this.isPayed = isPayed;
  }
}
