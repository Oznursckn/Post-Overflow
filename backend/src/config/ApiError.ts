import { getReasonPhrase, StatusCodes } from "http-status-codes";

export class ApiError {
  code: StatusCodes;
  readonly status: string;
  message: string;

  constructor(code: StatusCodes, message: string) {
    this.code = code;
    this.status = getReasonPhrase(code);
    this.message = message;
  }
}
