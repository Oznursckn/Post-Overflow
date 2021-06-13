import express from "express";
import { StatusCodes } from "http-status-codes";
import { PostDto, PostQueryDto } from "../dto/postDto";
import { ReactionDto } from "../dto/reactionDto";
import { queryValidation, validation } from "../middlewares/validation";
import { plainToClass } from "class-transformer";

import commentService from "../services/commentService";
import postService from "../services/postService";
import { jwtAuthMiddleware } from "../middlewares/jwtAuth";
import { postAuth } from "../middlewares/postAuth";
import { reactionAuth } from "../middlewares/reactionAuth";

const router = express.Router();

router.get("/", queryValidation(PostQueryDto), async (req, res, next) => {
  try {
    res.send(await postService.getAll(plainToClass(PostQueryDto, req.query)));
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  jwtAuthMiddleware,
  validation(PostDto),
  postAuth,
  async (req, res, next) => {
    try {
      res.status(StatusCodes.CREATED).send(await postService.save(req.body));
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", async (req, res, next) => {
  try {
    res.json(await postService.getById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", jwtAuthMiddleware, postAuth, async (req, res, next) => {
  try {
    await postService.delete(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    res.json(await commentService.getByPostId(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/like",
  jwtAuthMiddleware,
  validation(ReactionDto),
  reactionAuth,
  async (req, res, next) => {
    try {
      await postService.like(req.params.id, req.body.userId);
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
      await postService.unlike(req.params.id, req.body.userId);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/save",
  jwtAuthMiddleware,
  validation(ReactionDto),
  reactionAuth,
  async (req, res, next) => {
    try {
      await postService.savePost(req.params.id, req.body.userId);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/unsave",
  jwtAuthMiddleware,
  validation(ReactionDto),
  reactionAuth,
  async (req, res, next) => {
    try {
      await postService.unsavePost(req.params.id, req.body.userId);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/is-saved",
  jwtAuthMiddleware,
  validation(ReactionDto),
  async (req, res, next) => {
    try {
      res.send(await postService.isSaved(req.body.userId, req.params.id));
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
      res.send(await postService.isLiked(req.body.userId, req.params.id));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
