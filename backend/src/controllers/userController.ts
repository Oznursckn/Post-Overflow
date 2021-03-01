import express from "express";
import userService from "../services/userService";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await userService.getAll());
});

router.post("/", async (req, res) => {
  await userService.save(req.body);
  res.status(201).send();
});

router.get("/:id", async (req, res) => {
  const user = await userService.getById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "Kullanıcı Bulunamadı" });
  } else {
    res.json(user);
  }
});

router.delete("/:id", async (req, res) => {
  await userService.delete(req.params.id);
  res.status(204).send();
});

router.put("/:id", async (req,res) => {
    await userService.update(req.params.id);
    res.status(204).send();
});

export default router;
