import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";
import { ApiValidationError } from "./ApiValidationError";

export function errorHandler(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError || err instanceof ApiValidationError) {
    res.status(err.code).json(err);
  } else {
    const apiError = new ApiError(500, err.message);
    res.status(apiError.code).json(apiError);
  }
}
