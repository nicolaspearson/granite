import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import User from '$/db/entities/user.entity';

function hashPassword(password: string) {
  const crypt = `crypt('${password}', gen_salt('bf', 8))`;
  return () => crypt;
}

export const userFixtures: QueryDeepPartialEntity<User>[] = [
  {
    uuid: '343c6ac5-2b72-4c41-a9eb-28f5ae49af80' as Uuid,
    email: 'john.doe@example.com' as Email,
    password: hashPassword('secret'),
    createdAt: new Date(),
  },
];
