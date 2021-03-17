import express from "express";
import { nextTick } from "process";
import userService from "../services/userService";
import postService from "../services/postService";
import { StatusCodes } from "http-status-codes";
import commentService from "../services/commentService";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await userService.getAll());
});

router.post("/", async (req, res, next) => {
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

router.delete("/:id", async (req, res, next) => {
  try {
    await userService.delete(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await userService.update(req.params.id, req.body);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", async (req, res, next) => {
  try {
    res.json(await postService.getPostsByUserId(req.params.id));
  } catch (error) {
    next(error);
  }
});

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
