import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../config/ApiError";
import jwt from "jsonwebtoken";
import userService from "../services/userService";
import commentService from "../services/commentService";
import bcrypt from "bcrypt";

export async function jwtAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    const error = new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    next(error);
    return;
  }

  const decodedToken = jwt.decode(token);

  const user = await userService.getById(decodedToken.sub);

  if (!user.token || !(await bcrypt.compare(token, user.token))) {
    const error = new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    next(error);
    return;
  }

  next();
}
