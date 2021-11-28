import { Observable } from 'rxjs';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { timeoutHandler } from '$/handlers/timeout.handler';

@Injectable()
export class HttpTimeoutInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    const timeoutMilliseconds: number = Number(process.env.HTTP_TIMEOUT) || 10 * 1000;
    return timeoutHandler(next, timeoutMilliseconds);
  }
}
