import { StatusCodes } from "http-status-codes";

export class ApiValidationError {
  readonly status: number;
  errors: string[];

  constructor(errors: string[]) {
    this.status = StatusCodes.BAD_REQUEST;
    this.errors = errors;
  }
}
