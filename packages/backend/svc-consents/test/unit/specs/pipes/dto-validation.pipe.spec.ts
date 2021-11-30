import { ValidationError } from 'class-validator';

import { ValidationPipe } from '@nestjs/common';

import { BadRequestError } from 'lib-nest/src';
import { ErrorName } from 'lib-nest/src';

import { DtoValidationPipe, exceptionFactory } from '$/pipes/dto-validation.pipe';

describe('Dto Validation Pipe', () => {
  test('should return an instance of a validation pipe', () => {
    const pipe = new DtoValidationPipe();
    expect(pipe).toBeInstanceOf(ValidationPipe);
  });

  describe('exceptionFactory', () => {
    test('should throw a bad request exception correctly when validation fails', () => {
      const errors = [
        {
          property: 'email',
          children: [],
          constraints: {
            isEmail: 'email must be an email',
          },
        },
      ] as ValidationError[];
      const error = exceptionFactory(errors);
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.code).toEqual(400);
      expect(error.message).toEqual('Validation failed.');
      expect(error.name).toEqual(ErrorName.BadRequest);
      expect(error.errors).toMatchObject([
        {
          email: {
            isEmail: 'email must be an email',
          },
        },
      ]);
    });
  });
});
