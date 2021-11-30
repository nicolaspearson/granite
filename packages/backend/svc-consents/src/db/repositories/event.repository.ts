import { AbstractRepository, EntityManager, EntityRepository, SelectQueryBuilder } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { UnprocessableEntityError } from 'lib-nest/src';

import Event from '$/db/entities/event.entity';
import User from '$/db/entities/user.entity';
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

  async create(data: { enabled: boolean; type: EventType; userUuid: Uuid }): Promise<Event> {
    // Check if the user exists before attempting to save the event.
    // The user might have deleted their account but still has a valid JWT.
    await this.verifyUser(data.userUuid);
    // Save the event.
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

  /**
   * This method checks if a user exists or not. If the user does not exist a 422 error is thrown.
   * This check will be redundant if we add JWT whitelisting to the service.
   *
   * Ideally this repository should not be accessing the user table directly, but this exists
   * temporarily as work around to avoid unhandled exceptions occurring.
   *
   * @param userUuid The uuid of the user.
   */
  private async verifyUser(userUuid: Uuid): Promise<void> {
    const user = await this.manager
      .createQueryBuilder(User, 'user')
      .where('user.uuid = :userUuid', { userUuid })
      .getOne();
    if (!user) {
      throw new UnprocessableEntityError();
    }
  }
}
