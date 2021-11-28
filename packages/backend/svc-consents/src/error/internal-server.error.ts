import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { ErrorName } from '$/enum/error-name.enum';

import { BaseError } from './base.error';

const DEFAULT_MESSAGE = "The server has encountered a situation it doesn't know how to handle.";

export class InternalServerError extends BaseError {
  @ApiProperty({
    description: 'The HTTP response code.',
    example: HttpStatus.INTERNAL_SERVER_ERROR,
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
    example: DEFAULT_MESSAGE,
  })
  declare readonly message: string;

  @ApiProperty({
    description: 'The name of the error.',
    example: ErrorName.InternalServerError,
  })
  declare readonly name: string;

  constructor(message?: string, errors?: string[] | Record<string, unknown>[]) {
    super({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      errors,
      message: message || DEFAULT_MESSAGE,
      name: ErrorName.InternalServerError,
    });
  }
}
