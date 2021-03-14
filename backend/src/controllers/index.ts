import express from "express";
import { errorHandler } from "../config/errorHandler";

import userController from "./userController";
import postController from "./postController";
import commentController from "./commentController";

const router = express.Router();

router.use("/users", userController);
router.use("/posts", postController);
router.use("/comments", commentController);

router.use(errorHandler);

export default router;
