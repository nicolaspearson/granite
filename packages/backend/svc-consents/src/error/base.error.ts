import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { ErrorName } from '$/enum/error-name.enum';

import { DEFAULT_MESSAGE } from './internal-server.error';

export class BaseError extends Error {
  @ApiProperty({
    description: 'The HTTP response code.',
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  code: number;

  @ApiProperty({
    description: 'An array of error details.',
    example: [],
    isArray: true,
  })
  errors: string[] | Record<string, unknown>[];

  @ApiProperty({
    description: 'The error message.',
    example: DEFAULT_MESSAGE,
  })
  message: string;

  @ApiProperty({
    description: 'The name of the error.',
    example: ErrorName.InternalServerError,
  })
  name: string;

  constructor(error?: SvcConsents.Error) {
    super();
    this.code = error?.code || HttpStatus.INTERNAL_SERVER_ERROR;
    this.errors = error?.errors || [];
    this.message = error?.message || DEFAULT_MESSAGE;
    this.name = error?.name || ErrorName.InternalServerError;
  }
}
