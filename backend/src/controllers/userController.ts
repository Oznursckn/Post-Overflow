import express from "express";
import { nextTick } from "process";
import userService from "../services/userService";
import postService from "../services/postService";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await userService.getAll());
});

router.post("/", async (req, res, next) => {
  try {
    await userService.save(req.body);
    res.status(201).send();
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
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await userService.update(req.params.id, req.body);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/posts", async (req, res, next) => {
  try {
    res.json(await postService.getPostsByUserId(req.params.userId));
  } catch (error) {
    next(error);
  }
});

export default router;
