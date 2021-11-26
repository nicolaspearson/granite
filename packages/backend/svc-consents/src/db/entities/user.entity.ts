import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: Uuid;

  @Column({ name: 'email_address', length: 250 })
  emailAddress!: string;

  @Column({ name: 'first_name', length: 250 })
  firstName!: string;

  @Column({ name: 'last_name', length: 250 })
  lastName!: string;

  @Column({ name: 'password', length: 100 })
  password!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, type: 'timestamp with time zone' })
  updatedAt?: Date;
}
