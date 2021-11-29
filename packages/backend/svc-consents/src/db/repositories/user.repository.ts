import {
  AbstractRepository,
  DeleteResult,
  EntityManager,
  EntityRepository,
  SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Injectable } from '@nestjs/common';

import User from '$/db/entities/user.entity';
import { generateSalt } from '$/db/utils/user.util';
import { NotFoundError } from '$/error';

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
    if (options?.events) {
      query.leftJoinAndSelect('user.events', 'events').distinctOn(['events.type']).orderBy({
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
    return this.userQuery()
      .where({ email })
      .andWhere('user.password = crypt(:password, user.password)', { password })
      .getOne();
  }
}
