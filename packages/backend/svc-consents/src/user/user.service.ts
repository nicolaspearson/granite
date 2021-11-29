import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import User from '$/db/entities/user.entity';
import { UserRepository } from '$/db/repositories/user.repository';
import { UserProfileResponse, UserRegistrationResponse } from '$/dto';
import { BadRequestError } from '$/error';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async delete(userUuid: Uuid): Promise<void> {
    await this.userRepository.delete(userUuid);
  }

  async profile(userUuid: Uuid): Promise<UserProfileResponse> {
    this.logger.log(`Retrieving for user with uuid: ${userUuid}`);
    const user = await this.userRepository.findByUuidOrFail(userUuid);
    return new UserProfileResponse(user);
  }

  async register(email: Email, password: string): Promise<UserRegistrationResponse> {
    this.logger.log(`Registering user with email address: ${email}`);
    let user: User;
    try {
      user = await this.userRepository.create({ email, password });
      this.logger.log(`Successfully registered user with email address: ${email}`);
    } catch (error) {
      throw new BadRequestError('Invalid email address or password provided.');
    }
    return new UserRegistrationResponse(user);
  }
}
