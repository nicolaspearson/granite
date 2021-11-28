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

@Injectable()
@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  constructor(protected readonly manager: EntityManager) {
    super();
  }

  private userQuery(): SelectQueryBuilder<User> {
    return this.manager.createQueryBuilder(User, 'user');
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

  findByEmail(email: string): Promise<User | undefined> {
    return this.userQuery().where({ email }).getOne();
  }

  findByValidCredentials(email: Email, password: string): Promise<User | undefined> {
    return this.userQuery()
      .where({ email })
      .andWhere('user.password = crypt(:password, user.password)', { password })
      .getOne();
  }
}
