import express from "express";
import { errorHandler } from "../config/errorHandler";

import userController from "./userController";
import postController from "./postController";
import commentController from "./commentController";
import newsController from "./newsController";

const router = express.Router();

router.use("/users", userController);
router.use("/posts", postController);
router.use("/comments", commentController);
router.use("/news", newsController);

router.use(errorHandler);

export default router;
