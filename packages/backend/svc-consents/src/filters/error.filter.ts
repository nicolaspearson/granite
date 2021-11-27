import { Response } from 'express';

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

import { Environment } from '$/enum/environment.enum';
import { ErrorName } from '$/enum/error-name.enum';
import { BaseError } from '$/error/base.error';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name);

  private readonly httpExceptionMapper: { [code: number]: string } = {
    400: ErrorName.BadRequest.toString(),
    401: ErrorName.Unauthorized.toString(),
    403: ErrorName.Forbidden.toString(),
    404: ErrorName.NotFound.toString(),
    408: ErrorName.RequestTimeout.toString(),
    500: ErrorName.InternalServerError.toString(),
    501: ErrorName.NotImplemented.toString(),
  };

  catch(exception: Record<string, unknown>, host: ArgumentsHost): SvcConsents.Error {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    const error = this.parseException(exception);

    this.logger.warn(JSON.stringify(error));
    if (process.env.NODE_ENV === Environment.Development) {
      // Log the raw error to assist with debugging in the development environment
      console.log(exception);
    }

    response.status(error.code).json(error);
    return error;
  }

  parseException(exception: Record<string, unknown>): SvcConsents.Error {
    if (exception instanceof BaseError) {
      return exception;
    }

    const { status } = exception;

    const error = new BaseError({
      code: status ? Number(status) : 500,
      message: "The server has encountered a situation it doesn't know how to handle.",
      name: this.httpExceptionMapper[500],
    });

    if (exception instanceof HttpException) {
      error.message = exception.message;
      error.name = this.httpExceptionMapper[error.code];
    }

    return error;
  }
}
