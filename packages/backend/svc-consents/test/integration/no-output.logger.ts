/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { LoggerService } from '@nestjs/common';

export class NoOutputLogger implements LoggerService {
  debug(_: unknown, __?: string | undefined) {}
  error(_: unknown, ___?: string | undefined, __?: string | undefined) {}
  log(_: unknown, __?: string | undefined) {}
  verbose(_: unknown, __?: string | undefined) {}
  warn(_: unknown, __?: string | undefined) {}
}
