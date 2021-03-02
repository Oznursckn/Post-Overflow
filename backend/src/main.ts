import "reflect-metadata";
import express from "express";
import { connectToDatabase } from "./database";

import controllers from "./controllers";

console.log(process.env.NODE_ENV);

const app = express();
app.use(express.json());

app.use("/api", controllers);

const PORT = process.env.PORT || 5000;

connectToDatabase();
app.listen(PORT, () =>
  console.log(`API http://localhost:${PORT} adresinde çalışmaya başladı`)
);
