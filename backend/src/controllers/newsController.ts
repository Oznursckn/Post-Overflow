import express from "express";
import newsService from "../services/newsService";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.send(await newsService.getNews());
  } catch (error) {
    next(error);
  }
});

export default router;
