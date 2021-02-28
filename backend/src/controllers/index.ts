import express from "express";

import userController from "./userController";

const router = express.Router();

router.use("/users", userController);




export default router;



