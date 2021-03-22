import express from "express";
import tagService from "../services/tagService";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.send(await tagService.getAll());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.send(await tagService.getById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", async (req, res, next) => {
  try {
    res.send(await tagService.getPosts(req.params.id));
  } catch (error) {
    next(error);
  }
});

export default router;
