import express from "express";
import postService from "../services/postService";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await postService.getAll());
});

router.post("/", async (req, res) => {
  await postService.save(req.body);
  res.sendStatus(201);
});

router.get("/:id", async (req, res) => {
  const post = await postService.getById(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Paylaşım Bulunamadı" });
  } else {
    res.json(post);
  }
});

export default router;
