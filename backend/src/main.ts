import "reflect-metadata";
import express from "express";
import { connectToDatabase } from "./database";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Post Overflow Rest API" });
});

const PORT = process.env.PORT || 5000;

connectToDatabase();
app.listen(PORT, () =>
  console.log(`API http://localhost:${PORT} adresinde çalışmaya başladı`)
);
