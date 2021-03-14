import express from "express";
import { StatusCodes } from "http-status-codes";

import commentService from "../services/commentService";

const router = express.Router();

router.post("/", async (req, res, next) => {
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

router.post("/:id/like", async (req, res, next) => {
  try {
    res.json(await commentService.like(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.post("/:id/dislike", async (req, res, next) => {
  try {
    res.json(await commentService.dislike(req.params.id));
  } catch (error) {
    next(error);
  }
});

export default router;
