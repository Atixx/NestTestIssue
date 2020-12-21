import { HttpStatus } from "@nestjs/common";
import { KnownError } from "./known-error";

export class ExternalServiceError extends KnownError {
  constructor(error: Record<string, unknown>,
    notifyExternalService: boolean = true) {
    super();
    this.originalError = error;
    this.statusCode = HttpStatus.SERVICE_UNAVAILABLE;
    this.message = 'External service error';
    this.notifyExternalService = notifyExternalService;
  }
}
