import express from "express";
import { StatusCodes } from "http-status-codes";
import { stringify } from "node:querystring";

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

export default router;
