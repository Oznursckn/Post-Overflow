import express from "express";
import { StatusCodes } from "http-status-codes";

import commentService from "../services/commentService";
import postService from "../services/postService";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await postService.getAll());
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

export default router;
