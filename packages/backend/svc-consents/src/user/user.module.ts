import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '$/db/repositories/user.repository';
import { UserController } from '$/user/user.controller';
import { UserService } from '$/user/user.service';

@Module({
  controllers: [UserController],
  imports: [ConfigModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
})
export class UserModule {}
