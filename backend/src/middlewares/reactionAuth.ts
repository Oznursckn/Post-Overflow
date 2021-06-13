import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../config/ApiError";
import jwt from "jsonwebtoken";

export async function reactionAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  const decodedToken = jwt.decode(token);

  const userId = req.body.userId;

  if (decodedToken.sub !== userId) {
    const error = new ApiError(StatusCodes.FORBIDDEN, "Forbidden");
    next(error);
    return;
  }

  next();
}
