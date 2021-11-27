import { oneLine } from 'common-tags';
import { Connection, ObjectType } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Logger } from '@nestjs/common';

import User from '$/db/entities/user.entity';
import { userFixtures } from '$/db/fixtures/user.fixture';

type Entity = ObjectType<Record<string, unknown>>;

interface Fixture {
  entity: Entity;
  values: QueryDeepPartialEntity<Entity>[];
}

const fixtures: Fixture[] = [{ entity: User, values: userFixtures }];

export async function seed(connection: Connection): Promise<void> {
  await connection.query(oneLine`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `);
  const logger: Logger = new Logger('Seeder');
  logger.debug('Seeding the database');
  for (const fixture of fixtures) {
    await connection
      .createQueryBuilder()
      .insert()
      .into(fixture.entity)
      .values(fixture.values)
      .execute();
  }
  logger.debug('Seeding complete');
}
