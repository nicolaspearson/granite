import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '$/db/repositories/user.repository';
import { UserRegistrationResponse } from '$/dto';
import { BadRequestError } from '$/error';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async register(email: Email, password: string): Promise<UserRegistrationResponse> {
    this.logger.log(`Registering user with email address: ${email}`);
    try {
      const user = await this.userRepository.create({ attributes: { email, password } });
      this.logger.log(`Successfully registered user with email address: ${email}`);
      return new UserRegistrationResponse({ uuid: user.uuid, email: user.email, consents: [] });
    } catch (error) {
      throw new BadRequestError('Invalid email address or password provided.');
    }
  }
}
