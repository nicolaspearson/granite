/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, ExecutionContext } from '@nestjs/common';

import { ErrorName } from '$/enum/error-name.enum';
import { BadRequestError } from '$/error';
import { ErrorFilter } from '$/filters/error.filter';

const jsonMock = jest.fn().mockReturnThis();

const contextMock = {
  getArgByIndex: jest.fn().mockReturnThis(),
  getArgs: jest.fn().mockReturnThis(),
  getClass: jest.fn().mockReturnThis(),
  getHandler: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnThis(),
  getType: jest.fn().mockReturnThis(),
  switchToHttp: jest.fn(() => {
    return {
      getRequest: jest.fn().mockReturnThis(),
      getNext: jest.fn().mockReturnThis(),
      getResponse: jest.fn(() => {
        return {
          status: jest.fn(() => {
            return {
              json: jsonMock,
            };
          }),
        } as any;
      }),
    };
  }),
  switchToRpc: jest.fn().mockReturnThis(),
  switchToWs: jest.fn().mockReturnThis(),
} as ExecutionContext;

const badRequestErrorMock: SvcConsents.Error = {
  code: 400,
  message: 'Invalid arguments provided.',
  name: ErrorName.BadRequest,
  errors: [],
};

describe('Error Filter', () => {
  const filter = new ErrorFilter();

  beforeEach(() => {
    jsonMock.mockClear();
  });

  test('should return and format an error correctly using an http exception', () => {
    const error = new BadRequestException(badRequestErrorMock.message);
    const result = filter.catch(error as unknown as any, contextMock);
    expect(contextMock.switchToHttp).toBeCalled();
    expect(result.code).toEqual(badRequestErrorMock.code);
    expect(result.errors).toEqual(badRequestErrorMock.errors);
    expect(result.message).toEqual(badRequestErrorMock.message);
    expect(result.name).toEqual(badRequestErrorMock.name);
    expect(jsonMock).toBeCalledWith(result);
  });

  test('should return and format an error correctly using a bad request error', () => {
    const error = new BadRequestError(badRequestErrorMock.message);
    const result = filter.catch(error as unknown as any, contextMock);
    expect(contextMock.switchToHttp).toBeCalled();
    expect(result.code).toEqual(badRequestErrorMock.code);
    expect(result.errors).toEqual(badRequestErrorMock.errors);
    expect(result.message).toEqual(badRequestErrorMock.message);
    expect(result.name).toEqual(badRequestErrorMock.name);
    expect(jsonMock).toBeCalledWith(result);
  });
});
