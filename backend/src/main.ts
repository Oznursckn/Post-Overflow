import "reflect-metadata";
import express from "express";
import colors from "colors";
import morgan from "morgan";

import logger from "./middlewares/logger";
import { connectToDatabase } from "./config/database";
import controllers from "./controllers";

async function start() {
  const app = express();
  const PORT = 5000;

  colors.enable();

  app.use(morgan(logger));
  app.use(express.json());
  app.use("/api", controllers);

  console.clear();
  console.log(`${`[Server]`.green} Environment: ${process.env.NODE_ENV}`);

  await connectToDatabase();

  app.listen(PORT, () =>
    console.log(
      `${`[Server]`.green} API started on ${
        `http://localhost:${PORT}`.underline.blue
      }\n`
    )
  );
}

start();
