import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import compression from "compression";

import logger from "./middlewares/logger";
import { connectToDatabase } from "./config/database";
import apiDocs from "./config/apiDocs";
import controllers from "./controllers";

async function start() {
  const app = express();
  const PORT = 5000;

  dotenv.config();
  colors.enable();

  app.use(compression());
  app.use(logger);
  app.use(cookieParser());
  app.use(express.json());
  app.use("/api", controllers);
  app.use("/api/docs", apiDocs);

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
