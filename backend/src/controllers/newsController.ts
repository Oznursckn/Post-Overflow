import express from "express";
import newsService from "../services/newsService";

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send(await newsService.getNews());
});

export default router;
