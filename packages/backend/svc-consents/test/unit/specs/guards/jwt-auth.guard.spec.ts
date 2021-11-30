/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { sign } from 'jsonwebtoken';

import { ExecutionContext } from '@nestjs/common';

import { UnauthorizedError } from 'lib-nest/src';

import { JwtAuthGuard } from '$/guards/jwt-auth.guard';

import { jwtResponseMock, userMock } from '#/utils/fixtures';

const switchToHttpMock = {
  getRequest: jest.fn(),
  getResponse: jest.fn().mockReturnThis(),
  getNext: jest.fn().mockReturnThis(),
};

const contextMock = {
  getArgByIndex: jest.fn().mockReturnThis(),
  getArgs: jest.fn().mockReturnThis(),
  getClass: jest.fn().mockReturnThis(),
  getHandler: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnThis(),
  getType: jest.fn().mockReturnThis(),
  switchToHttp: jest.fn(() => switchToHttpMock),
  switchToRpc: jest.fn().mockReturnThis(),
  switchToWs: jest.fn().mockReturnThis(),
} as ExecutionContext;

describe('Jwt Auth Guard', () => {
  const guard = new JwtAuthGuard();

  beforeEach(jest.clearAllMocks);

  test('should throw if the jwt is not provided in the request', () => {
    switchToHttpMock.getRequest.mockReturnValueOnce({
      get: jest.fn(),
    });
    expect(() => guard.canActivate(contextMock)).toThrowError(UnauthorizedError);
  });

  test('should throw if jwt verification fails', () => {
    switchToHttpMock.getRequest.mockReturnValueOnce({
      get: jest.fn(() => `Bearer ${jwtResponseMock.token}`),
    });
    expect(() => guard.canActivate(contextMock)).toThrowError(UnauthorizedError);
  });

  test('should return true if the jwt is valid', () => {
    const jwt = sign(
      { uuid: userMock.uuid } as SvcConsents.JwtPayload,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.JWT_SECRET!,
      { expiresIn: '15m' },
    );
    switchToHttpMock.getRequest.mockReturnValueOnce({
      get: jest.fn(() => `Bearer ${jwt}`),
    });
    expect(guard.canActivate(contextMock)).toEqual(true);
  });
});
