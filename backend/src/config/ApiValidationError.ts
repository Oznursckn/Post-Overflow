import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class ApiValidationError {
  readonly code: StatusCodes;
  readonly status: string;
  errors: string[];

  constructor(errors: string[]) {
    this.code = StatusCodes.BAD_REQUEST;
    this.status = getReasonPhrase(StatusCodes.BAD_REQUEST);
    this.errors = errors;
  }
}
