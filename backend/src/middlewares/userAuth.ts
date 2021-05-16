import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../config/ApiError";
import jwt from "jsonwebtoken";

export async function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  const decodedToken = jwt.decode(token);

  const userIdParam = req.params.id;

  if (decodedToken.sub !== userIdParam) {
    const error = new ApiError(StatusCodes.FORBIDDEN, "Forbidden");
    next(error);
    return;
  }

  next();
}
