import {
  AbstractRepository,
  DeleteResult,
  EntityManager,
  EntityRepository,
  SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Injectable } from '@nestjs/common';

import { NotFoundError } from 'lib-nest/src';

import User from '$/db/entities/user.entity';
import { generateSalt } from '$/db/utils/user.util';

export interface UserQueryOptions {
  events?: boolean;
}

@Injectable()
@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  constructor(protected readonly manager: EntityManager) {
    super();
  }

  private userQuery(options?: UserQueryOptions): SelectQueryBuilder<User> {
    const query = this.manager.createQueryBuilder(User, 'user');
    // The event join is optional, and is included in the query by setting this option to true.
    if (options?.events) {
      // We use DISTINCT ON to only return the latest entry in the
      // event table grouped by `type` and ordered by `created_at`
      query.leftJoinAndSelect('user.events', 'events').distinctOn(['events.type']).orderBy({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'events.type': 'DESC',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'events.created_at': 'DESC',
      });
    }
    return query;
  }

  create(data: { email: Email; password: string }): Promise<User> {
    const user: QueryDeepPartialEntity<User> = {
      email: data.email,
      // The pgcrypto extension salts and hashes the user's password
      password: generateSalt(data.password, "'bf', 8"),
    };
    return this.manager.save(User, user as User);
  }

  delete(uuid: Uuid): Promise<DeleteResult> {
    return this.userQuery().delete().where({ uuid }).execute();
  }

  findByUuid(uuid: Uuid): Promise<User | undefined> {
    return this.userQuery({ events: true }).where({ uuid }).getOne();
  }

  async findByUuidOrFail(uuid: Uuid): Promise<User> {
    const user = await this.findByUuid(uuid);
    if (!user) {
      throw new NotFoundError('User does not exist.');
    }
    return user;
  }

  findByValidCredentials(email: Email, password: string): Promise<User | undefined> {
    // We use the pgcrypto extension to compare the hashed password to the plain text version
    return this.userQuery()
      .where({ email })
      .andWhere('user.password = crypt(:password, user.password)', { password })
      .getOne();
  }
}
