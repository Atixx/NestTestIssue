import { HttpStatus } from "@nestjs/common";
import { KnownError } from "./known-error";

export class DatabaseError extends KnownError {
  constructor(errorObject: Record<string, unknown>,
    notifyExternalService: boolean = true) {
    super();
    this.originalError = errorObject;
    this.statusCode = HttpStatus.SERVICE_UNAVAILABLE;
    this.message = 'Service Unavailable';
    this.notifyExternalService = notifyExternalService;
  }
}
