import { AbstractRepository, EntityManager, EntityRepository, SelectQueryBuilder } from 'typeorm';

import { Injectable } from '@nestjs/common';

import Event from '$/db/entities/event.entity';
import { EventType } from '$/enum/event-type.enum';

@Injectable()
@EntityRepository(Event)
export class EventRepository extends AbstractRepository<Event> {
  constructor(protected readonly manager: EntityManager) {
    super();
  }

  private eventQuery(): SelectQueryBuilder<Event> {
    return this.manager.createQueryBuilder(Event, 'event').innerJoinAndSelect('event.user', 'user');
  }

  create(data: { enabled: boolean; type: EventType; userUuid: Uuid }): Promise<Event> {
    return this.manager.save(Event, {
      enabled: data.enabled,
      type: data.type,
      user: { uuid: data.userUuid },
    } as Event);
  }

  findByUserUuid(userUuid: Uuid): Promise<Event[]> {
    return this.eventQuery().where('user.uuid = :userUuid', { userUuid }).getMany();
  }
}