import { Response } from 'express';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

import { ErrorName } from '$/enum/error-name.enum';
import { BaseError } from '$/error/base.error';
import { DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE } from '$/error/base.error';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name);

  private readonly httpExceptionMapper: { [code: number]: string } = {
    400: ErrorName.BadRequest.toString(),
    401: ErrorName.Unauthorized.toString(),
    403: ErrorName.Forbidden.toString(),
    404: ErrorName.NotFound.toString(),
    408: ErrorName.RequestTimeout.toString(),
    422: ErrorName.UnprocessableEntity.toString(),
    500: ErrorName.InternalServerError.toString(),
    501: ErrorName.NotImplemented.toString(),
  };

  /**
   * Catches all thrown exceptions that occur in the application.
   *
   * @param exception The exception that has been thrown.
   * @param host The host that we use to set the response.
   *
   * @returns The {@link SvcConsents.Error} that was created.
   */
  catch(exception: Record<string, unknown>, host: ArgumentsHost): SvcConsents.Error {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const error = this.parseException(exception);

    this.logger.warn(JSON.stringify(error));

    response.status(error.code).json(error);
    return error;
  }

  /**
   * Parses an exception using the available metadata, if not enough
   * metadata is available a generic internal server is generated.
   *
   * @param exception The exception that has been thrown.
   * @returns A well-formed {@link SvcConsents.Error} response object.
   */
  parseException(exception: Record<string, unknown>): SvcConsents.Error {
    if (exception instanceof BaseError) {
      return exception;
    }
    const { status } = exception;

    const error = new BaseError({
      code: status ? Number(status) : /* istanbul ignore next */ 500,
      message: DEFAULT_INTERNAL_SERVER_ERROR_MESSAGE,
      name: this.httpExceptionMapper[500],
    });

    if (exception instanceof HttpException) {
      error.message = exception.message;
      error.name = this.httpExceptionMapper[error.code];
    }

    return error;
  }
}
