import { oneLineTrim } from 'common-tags';

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserRegistrationRequest, UserRegistrationResponse } from '$/dto';
import { ApiGroup } from '$/enum/api-group.enum';
import { BadRequestError, InternalServerError } from '$/error';
import { UserService } from '$/user/user.service';

const TAG = ApiGroup.User;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Allows a new user to register.',
    description: oneLineTrim`
      Registers a new user, if the user already exists a 400 will be returned to avoid
      user enumeration attacks, however we are still vulnerable to a timing attack which
      is out of scope for the moment.
    `,
  })
  @ApiTags(TAG)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User has successfully registered.',
    type: UserRegistrationResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid payload provided.',
    type: BadRequestError,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An internal error occurred.',
    type: InternalServerError,
  })
  register(@Body() dto: UserRegistrationRequest): Promise<UserRegistrationResponse> {
    return this.userService.register(dto.email, dto.password);
  }
}
