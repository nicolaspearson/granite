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
    // TODO: Check if the user exists before attempting to save the event.
    // The user might have deleted their account but still has a valid JWT.
    return this.manager.save(Event, {
      enabled: data.enabled,
      type: data.type,
      user: { uuid: data.userUuid },
    } as Event);
  }

  findByUserUuid(userUuid: Uuid): Promise<Event[]> {
    // We use DISTINCT ON to only return the latest entry in the
    // event table grouped by `type` and ordered by `created_at`
    return this.eventQuery()
      .where('user.uuid = :userUuid', { userUuid })
      .distinctOn(['event.type'])
      .orderBy({
        'event.type': 'DESC',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'event.created_at': 'DESC',
      })
      .getMany();
  }
}
