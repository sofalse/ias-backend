import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @Column({
    type: 'decimal',
    scale: 2,
    precision: 9,
    nullable: false,
  })
  price: string;

  @Column({
    type: 'varchar',
    length: 3,
    nullable: false,
  })
  currency: string;

  constructor(id: number, name: string, price: string, description = null, currency: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.currency = currency;
  }
}
