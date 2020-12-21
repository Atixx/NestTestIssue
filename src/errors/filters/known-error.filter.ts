import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from 'express';
import { RollbarService } from "../../rollbar/rollbar.service";
import { KnownError } from "../types/known-error";

@Catch(KnownError)
export class KnownErrorFilter implements ExceptionFilter {
  constructor(private readonly loggerService: RollbarService) {}

  catch(exception: KnownError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.statusCode;

    Logger.error(exception.originalError); // TODO: log something more user friendly and readable
    if (exception.notifyExternalService) this.loggerService.logger.error(exception.originalError, request);

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message
      });
  }
}
