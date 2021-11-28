import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Event from '$/db/entities/event.entity';

@Entity({ name: 'user' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: Uuid;

  @Column('varchar', { name: 'email', unique: true })
  @Index('IDX_USER_EMAIL', { synchronize: false })
  email!: Email;

  @Column('varchar', { name: 'password', select: false })
  password!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, type: 'timestamp with time zone' })
  updatedAt?: Date;

  @OneToMany(() => Event, (event) => event.user)
  events!: Event[];
}
