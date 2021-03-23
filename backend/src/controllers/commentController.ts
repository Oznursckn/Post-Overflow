import express from "express";
import { StatusCodes } from "http-status-codes";
import { CommentDto } from "../dto/commentDto";
import { ReactionDto } from "../dto/reactionDto";
import { validation } from "../middlewares/validation";

import commentService from "../services/commentService";

const router = express.Router();

router.post("/", validation(CommentDto), async (req, res, next) => {
  try {
    await commentService.save(req.body);
    res.status(StatusCodes.CREATED).send();
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await commentService.delete(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
});

router.post("/:id/like", validation(ReactionDto), async (req, res, next) => {
  try {
    await commentService.like(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/:id/unlike", validation(ReactionDto), async (req, res, next) => {
  try {
    await commentService.unlike(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/:id/dislike", validation(ReactionDto), async (req, res, next) => {
  try {
    await commentService.dislike(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/undislike",
  validation(ReactionDto),
  async (req, res, next) => {
    try {
      await commentService.undislike(req.params.id, req.body.userId);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
