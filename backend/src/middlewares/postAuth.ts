import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../config/ApiError";
import jwt from "jsonwebtoken";
import postService from "../services/postService";

export async function postAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  const decodedToken = jwt.decode(token);

  const userId = req.body.userId;
  const postIdParam = req.params.id;

  if (userId) {
    if (decodedToken.sub !== userId) {
      const error = new ApiError(StatusCodes.FORBIDDEN, "Forbidden");
      next(error);
      return;
    }
  }

  if (postIdParam) {
    const post = await postService.getById(postIdParam);
    if (decodedToken.sub !== post.user.id) {
      const error = new ApiError(StatusCodes.FORBIDDEN, "Forbidden");
      next(error);
      return;
    }
  }

  next();
}
