import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { ErrorName } from '$/enum/error-name.enum';

import { BaseError } from './base.error';

export class BadRequestError extends BaseError {
  @ApiProperty({
    description: 'The HTTP response code.',
    example: HttpStatus.BAD_REQUEST,
  })
  declare readonly code: number;

  @ApiProperty({
    description: 'An array of error details.',
    example: [],
    isArray: true,
  })
  declare readonly errors: string[] | Record<string, unknown>[];

  @ApiProperty({
    description: 'The error message.',
    example: 'The server could not understand the request due to invalid syntax / arguments.',
  })
  declare readonly message: string;

  @ApiProperty({
    description: 'The name of the error.',
    example: ErrorName.BadRequest,
  })
  declare readonly name: string;

  constructor(message?: string, errors?: string[] | Record<string, unknown>[]) {
    super({
      code: 400,
      errors,
      message:
        message || 'The server could not understand the request due to invalid syntax / arguments.',
      name: ErrorName.BadRequest,
    });
  }
}
