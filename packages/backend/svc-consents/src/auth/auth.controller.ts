import { oneLineTrim } from 'common-tags';

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '$/auth/auth.service';
import { JwtResponse, LoginRequest } from '$/dto';
import { ApiGroup } from '$/enum/api-group.enum';
import { BadRequestError, InternalServerError } from '$/error';

const TAG = ApiGroup.Auth;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticates an existing user using the provided credentials.',
    description: oneLineTrim`
      Authenticates a user using the provided credentials, if the credentials are invalid or the 
      user does exist a 404 will be returned to avoid user enumeration attacks, however we are still
      vulnerable to a timing attack which is out of scope for the moment.
    `,
  })
  @ApiTags(TAG)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully authenticated.',
    type: JwtResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid payload provided.',
    type: BadRequestError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid login credentials provided.',
    type: BadRequestError,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An internal error occurred.',
    type: InternalServerError,
  })
  authenticate(@Body() dto: LoginRequest): Promise<JwtResponse> {
    return this.authService.authenticate(dto.email, dto.password);
  }
}
