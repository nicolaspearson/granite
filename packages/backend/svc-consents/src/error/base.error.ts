import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { ErrorName } from '$/enum/error-name.enum';

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
    example: "The server has encountered a situation it doesn't know how to handle.",
  })
  message: string;

  @ApiProperty({
    description: 'The name of the error.',
    example: ErrorName.InternalServerError,
  })
  name: string;

  constructor(error?: SvcConsents.Error) {
    super();
    this.code = error?.code || 500;
    this.errors = error?.errors || [];
    this.message =
      error?.message || "The server has encountered a situation it doesn't know how to handle.";
    this.name = error?.name || ErrorName.InternalServerError;
  }
}
