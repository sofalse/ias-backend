import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from 'item/item.entity';
import { User } from 'user/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @JoinTable()
  @ManyToMany(type => Item)
  items: Item[];

  @ManyToOne(type => User)
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(items: Item[], user: User) {
    this.items = items;
    this.user = user;
  }
}
