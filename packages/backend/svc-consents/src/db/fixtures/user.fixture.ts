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
    password: hashPassword('myS3cretP@55w0rd!'),
    createdAt: new Date(),
  },
  {
    uuid: '60625825-4bc5-4b53-be6f-73d090f3f34b' as Uuid,
    email: 'jane.doe@example.com' as Email,
    password: hashPassword('myS3cretP@55w0rd!'),
    createdAt: new Date(),
  },
  {
    uuid: '16fcbe9d-cded-4c0e-aa5a-8ce7dbad1107' as Uuid,
    email: 'deletable-user@example.com' as Email,
    password: hashPassword('myS3cretP@55w0rd!'),
    createdAt: new Date(),
  },
];
