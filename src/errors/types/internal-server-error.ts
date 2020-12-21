import { HttpStatus } from "@nestjs/common";
import { KnownError } from "./known-error";

export class InternalServerError extends KnownError {
  constructor(error: Record<string, unknown>,
    notifyExternalService: boolean = true) {
    super();
    this.originalError = error;
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = 'Internal server error';
    this.notifyExternalService = notifyExternalService;
  }
}
