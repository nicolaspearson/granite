import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { CallHandler } from '@nestjs/common';

import { RequestTimeoutError } from 'lib-nest/src';

export function timeoutHandler(
  handler: CallHandler,
  timeoutMilliseconds: number,
): Observable<unknown> {
  return handler.handle().pipe(
    timeout(timeoutMilliseconds),
    catchError((err) => {
      /* istanbul ignore next */
      if (err instanceof TimeoutError) {
        /* istanbul ignore next */
        return throwError(() => new RequestTimeoutError());
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return throwError(() => err);
    }),
  );
}
