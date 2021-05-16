import express from "express";
import { LoginDto } from "../dto/authDto";
import { validation } from "../middlewares/validation";
import authService from "../services/authService";

const router = express.Router();

router.post("/login", validation(LoginDto), async (req, res, next) => {
  try {
    res.json(await authService.login(req.body, res));
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    await authService.logout(req.cookies.token, res);
    res.send();
  } catch (error) {
    next(error);
  }
});

export default router;
