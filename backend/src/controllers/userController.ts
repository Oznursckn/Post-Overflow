import express from "express";
import userService from "../services/userService";
import postService from "../services/postService";
import { StatusCodes } from "http-status-codes";
import commentService from "../services/commentService";
import { queryValidation, validation } from "../middlewares/validation";
import { UserDto, UpdateUserDto } from "../dto/userDto";
import { PostQueryDto } from "../dto/postDto";
import { plainToClass } from "class-transformer";
import { jwtAuthMiddleware } from "../middlewares/jwtAuth";
import { userAuth } from "../middlewares/userAuth";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await userService.getAll());
});

router.post("/", validation(UserDto), async (req, res, next) => {
  try {
    await userService.save(req.body);
    res.status(StatusCodes.CREATED).send();
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json(await userService.getById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", jwtAuthMiddleware, userAuth, async (req, res, next) => {
  try {
    await userService.delete(req.params.id);
    res.clearCookie("token");
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  jwtAuthMiddleware,
  userAuth,
  validation(UpdateUserDto),
  async (req, res, next) => {
    try {
      await userService.update(req.params.id, req.body);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id/posts",
  queryValidation(PostQueryDto),
  async (req, res, next) => {
    try {
      res.json(
        await postService.getPostsByUserId(
          plainToClass(PostQueryDto, req.query),
          req.params.id
        )
      );
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id/liked-posts", async (req, res, next) => {
  try {
    res.json(await postService.getLikedPostsByUserId(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.get("/:id/saved-posts", async (req, res, next) => {
  try {
    res.json(await postService.getSavedPostsByUserId(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.get("/:id/liked-comments", async (req, res, next) => {
  try {
    res.json(await commentService.getLikedCommentsByUserId(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.get("/:id/disliked-comments", async (req, res, next) => {
  try {
    res.json(await commentService.getDislikedCommentsByUserId(req.params.id));
  } catch (error) {
    next(error);
  }
});

export default router;
