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
    await commentService.like(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/:id/unlike", async (req, res, next) => {
  try {
    await commentService.unlike(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/:id/dislike", async (req, res, next) => {
  try {
    await commentService.dislike(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post("/:id/undislike", async (req, res, next) => {
  try {
    await commentService.undislike(req.params.id, req.body.userId);
    res.send();
  } catch (error) {
    next(error);
  }
});

export default router;
