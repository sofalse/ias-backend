import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 32,
  })
  username: string;

  @Column({
    select: false,
    length: 64,
  })
  password: string;

  @Column({
    length: 128,
  })
  email: string;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  roles?: string[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
