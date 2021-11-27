import {
  AbstractRepository,
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityRepository,
  SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Injectable } from '@nestjs/common';

import User from '$/db/entities/user.entity';
import { generateSalt } from '$/db/utils/user.util';

@Injectable()
@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  constructor(protected readonly manager: EntityManager) {
    super();
  }

  private userQuery(): SelectQueryBuilder<User> {
    return this.manager.createQueryBuilder(User, 'user');
  }

  create(
    data: { attributes: DeepPartial<User>; user: User },
    manager: EntityManager,
  ): Promise<User> {
    const payload: QueryDeepPartialEntity<User> = {
      ...data.attributes,
    };
    if (data.attributes.password) {
      payload.password = generateSalt(data.attributes.password, "'bf', 8");
    }
    return manager.save(User, payload as User);
  }

  delete(uuid: Uuid, manager: EntityManager): Promise<DeleteResult> {
    return manager
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('"userUuid" = :uuid', { uuid })
      .execute();
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userQuery().clone().where({ email }).getOne();
  }

  findByValidCredentials(email: Email, password: string): Promise<User | undefined> {
    return this.userQuery()
      .clone()
      .where({ email })
      .andWhere('user.password = crypt(:password, user.password)', { password })
      .getOne();
  }
}
