import { HttpStatus } from "@nestjs/common";
import { KnownError } from "./known-error";

const ERROR_MESSAGE = 'User already verified';

export class UserAlreadyVerifiedError extends KnownError {
  constructor(errorObject: Record<string, unknown> = {}) {
    super();
    this.originalError = {
      message: ERROR_MESSAGE,
      ...errorObject
    };
    this.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    this.message = ERROR_MESSAGE;
    this.notifyExternalService = false;
  }
}
