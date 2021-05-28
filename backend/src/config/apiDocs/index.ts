import express from "express";
import swaggerUi from "swagger-ui-express";
import config from "./openapi.json";

const router = express.Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(config));

export default router;
