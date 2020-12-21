import { HttpStatus } from "@nestjs/common";
import { KnownError } from "./known-error";

export class ForeignKeyError extends KnownError {
  constructor(errorObject: Record<string, unknown>,
    notifyExternalService: boolean = false) {
    super();
    this.originalError = errorObject;
    this.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
    this.message = 'Entity missing, check foreign keys';
    this.notifyExternalService = notifyExternalService;
  }
}
