import express from "express";
import { StatusCodes } from "http-status-codes";
import { CommentDto } from "../dto/commentDto";
import { ReactionDto } from "../dto/reactionDto";
import { validation } from "../middlewares/validation";
import commentService from "../services/commentService";
import { jwtAuthMiddleware } from "../middlewares/jwtAuth";
import { postAuth } from "../middlewares/postAuth";
import { commentAuth } from "../middlewares/commentAuth";
import { reactionAuth } from "../middlewares/reactionAuth";

const router = express.Router();

router.post(
  "/",
  jwtAuthMiddleware,
  validation(CommentDto),
  commentAuth,
  async (req, res, next) => {
    try {
      await commentService.save(req.body);
      res.status(StatusCodes.CREATED).send();
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  jwtAuthMiddleware,
  commentAuth,
  async (req, res, next) => {
    try {
      await commentService.delete(req.params.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/like",
  jwtAuthMiddleware,
  validation(ReactionDto),
  reactionAuth,
  async (req, res, next) => {
    try {
      await commentService.like(req.params.id, req.body.userId);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/unlike",
  jwtAuthMiddleware,
  validation(ReactionDto),
  reactionAuth,
  async (req, res, next) => {
    try {
      await commentService.unlike(req.params.id, req.body.userId);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/dislike",
  jwtAuthMiddleware,
  validation(ReactionDto),
  reactionAuth,
  async (req, res, next) => {
    try {
      await commentService.dislike(req.params.id, req.body.userId);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/undislike",
  jwtAuthMiddleware,
  validation(ReactionDto),
  reactionAuth,
  async (req, res, next) => {
    try {
      await commentService.undislike(req.params.id, req.body.userId);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/is-liked",
  jwtAuthMiddleware,
  validation(ReactionDto),
  async (req, res, next) => {
    try {
      res.send(await commentService.isLiked(req.body.userId, req.params.id));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/is-disliked",
  jwtAuthMiddleware,
  validation(ReactionDto),
  async (req, res, next) => {
    try {
      res.send(await commentService.isDisliked(req.body.userId, req.params.id));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
