import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import Event from '$/db/entities/event.entity';
import { userFixtures } from '$/db/fixtures/user.fixture';
import { EventType } from '$/enum/event-type.enum';

export const eventFixtures: QueryDeepPartialEntity<Event>[] = [
  {
    type: EventType.Email,
    enabled: true,
    createdAt: new Date(),
    user: userFixtures[1],
  },
];
