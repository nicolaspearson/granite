import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from '$/db/entities/user.entity';
import { EventType } from '$/enum/event-type.enum';

@Entity({ name: 'event' })
export default class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('enum', { enum: EventType })
  type!: EventType;

  @Column('boolean', { name: 'enabled', nullable: false, default: false })
  enabled!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @ManyToOne((_) => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  @Index('IDX_EVENT_USER_UUID')
  user!: User;
}
