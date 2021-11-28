import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '$/db/repositories/user.repository';
import { JwtResponse } from '$/dto';
import { NotFoundError } from '$/error';
import { TokenService } from '$/token/token.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly tokenService: TokenService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async authenticate(email: Email, password: string): Promise<JwtResponse> {
    try {
      const user = await this.userRepository.findByValidCredentials(email, password);
      if (user) {
        this.logger.log(`User with email: ${user.email} has logged in`);
        // Generate and return a JWT
        const token = await this.tokenService.generate({ uuid: user.uuid });
        return new JwtResponse({ token: token as JwtToken });
      }
    } catch (error) {
      this.logger.error(
        `Authentication failed while attempting to login user with email: ${email}`,
        error,
      );
    }
    // Always return the same error if a login attempt fails in order to avoid user
    // enumeration attacks, however we are still vulnerable to a timing attack which
    // is out of scope for the moment.
    throw new NotFoundError('Invalid email address or password provided.');
  }
}
