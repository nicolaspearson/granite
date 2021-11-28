/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Observable } from 'rxjs';

import { ExecutionContext } from '@nestjs/common';

import { HttpTimeoutInterceptor } from '$/interceptors/http-timeout.interceptor';

const interceptor = new HttpTimeoutInterceptor();

const contextMock = {
  getArgByIndex: jest.fn().mockReturnThis(),
  getArgs: jest.fn().mockReturnThis(),
  getClass: jest.fn().mockReturnThis(),
  getHandler: jest.fn().mockReturnThis(),
  getRequest: jest.fn().mockReturnThis(),
  getType: jest.fn().mockReturnThis(),
  switchToHttp: jest.fn().mockReturnThis(),
  switchToRpc: jest.fn().mockReturnThis(),
  switchToWs: jest.fn().mockReturnThis(),
} as ExecutionContext;

const callHandlerMock = {
  handle: jest.fn(() => new Observable()),
};

describe('Http Timeout Interceptor', () => {
  test('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('intercept', () => {
    test('intercepts and calls the handler', () => {
      interceptor.intercept(contextMock, callHandlerMock);
      expect(callHandlerMock.handle).toBeCalledTimes(1);
    });
  });
});
