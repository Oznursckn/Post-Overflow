import express from "express";

import userController from "./userController";
import postController from "./postController";
import { errorHandler } from "../config/errorHandler";

const router = express.Router();

router.use("/users", userController);
router.use("/posts", postController);

router.use(errorHandler);

export default router;
