import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../config/ApiError";
import jwt from "jsonwebtoken";
import commentService from "../services/commentService";

export async function commentAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  const decodedToken = jwt.decode(token);

  const userId = req.body.userId;
  const commentIdParam = req.params.id;

  if (userId) {
    if (decodedToken.sub !== userId) {
      const error = new ApiError(StatusCodes.FORBIDDEN, "Forbidden");
      next(error);
      return;
    }
  }

  if (commentIdParam) {
    const comment = await commentService.getById(commentIdParam);
    if (decodedToken.sub !== comment.user.id) {
      const error = new ApiError(StatusCodes.FORBIDDEN, "Forbidden");
      next(error);
      return;
    }
  }

  next();
}
