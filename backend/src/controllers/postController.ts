import express from "express";
import { StatusCodes } from "http-status-codes";

import commentService from "../services/commentService";
import postService from "../services/postService";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const search = req.query.search ? String(req.query.search) : null;
  try {
    res.send(await postService.getAll(search));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await postService.save(req.body);
    res.status(StatusCodes.CREATED).send();
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json(await postService.getById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
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

router.post("/:id/like", async (req, res, next) => {
  try {
    await postService.like(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/:id/unlike", async (req, res, next) => {
  try {
    await postService.unlike(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/:id/save", async (req, res, next) => {
  try {
    await postService.savePost(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/:id/unsave", async (req, res, next) => {
  try {
    await postService.unsavePost(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

export default router;
