import { Observable, TimeoutError, throwError } from 'rxjs';

import { timeoutHandler } from '$/handlers/timeout.handler';

describe('Timeout Handler', () => {
  test('should be defined', () => {
    expect(timeoutHandler).toBeDefined();
  });

  test('does not throw when the function returns before the timeout period', async () => {
    const callHandler = {
      handle: () => new Observable((subscriber) => subscriber.complete()),
    };
    const result: Observable<unknown> = timeoutHandler(callHandler, 100);
    expect(await result.toPromise()).toBeUndefined();
  });

  test('throws a request timeout exception when the function times out', async () => {
    const callHandler = {
      handle: () =>
        new Observable(() => {
          throw throwError(() => new TimeoutError());
        }),
    };
    const result: Observable<unknown> = timeoutHandler(callHandler, 100);
    await expect(result.toPromise()).rejects.toBeDefined();
  });

  test('throws the error when the function fails', async () => {
    const callHandler = {
      handle: () =>
        new Observable(() => {
          throw throwError(() => new Error('An unknown error occurred'));
        }),
    };
    const result: Observable<unknown> = timeoutHandler(callHandler, 100);
    await expect(result.toPromise()).rejects.toBeDefined();
  });
});
