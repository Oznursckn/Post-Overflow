import express from "express";
import { PostQueryDto } from "../dto/postDto";
import { queryValidation } from "../middlewares/validation";
import postService from "../services/postService";
import tagService from "../services/tagService";
import { plainToClass } from "class-transformer";

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

router.get(
  "/:id/posts",
  queryValidation(PostQueryDto),
  async (req, res, next) => {
    try {
      res.send(
        await postService.getAllByTag(
          plainToClass(PostQueryDto, req.query),
          req.params.id
        )
      );
    } catch (error) {
      next(error);
    }
  }
);

export default router;
