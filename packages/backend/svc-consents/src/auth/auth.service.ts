import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import User from '$/db/entities/user.entity';
import { UserRepository } from '$/db/repositories/user.repository';
import { JwtResponse } from '$/dto';
import { InternalServerError, NotFoundError } from '$/error';
import { TokenService } from '$/token/token.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly tokenService: TokenService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  private async generateJwt(user: User) {
    try {
      // Generate and return a JWT
      const token = await this.tokenService.generate({ uuid: user.uuid });
      return token;
    } catch (error) {
      /* istanbul ignore next: ignore for integration test coverage */
      this.logger.error(`An error occurred while generating a new Jwt.`, error);
      /* istanbul ignore next: ignore for integration test coverage */
      throw new InternalServerError();
    }
  }

  async authenticate(email: Email, password: string): Promise<JwtResponse> {
    this.logger.log(`User with email: ${email} is attempting to login`);
    const user = await this.userRepository.findByValidCredentials(email, password);
    if (user) {
      const jwt = await this.generateJwt(user);
      return new JwtResponse({ token: jwt as JwtToken });
    }
    // Always return the same error if a login attempt fails in order to avoid user
    // enumeration attacks, however we are still vulnerable to a timing attack which
    // is out of scope for the moment.
    throw new NotFoundError('Invalid email address or password provided.');
  }
}
