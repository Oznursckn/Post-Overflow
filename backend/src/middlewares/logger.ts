import morgan from "morgan";
import { Request, Response } from "express";

function getStatus(tokens, req: Request, res: Response) {
  const statusCode = res.statusCode;
  const status = `${tokens.status(req, res)}`;

  switch (true) {
    case statusCode < 300:
      return status.green;
    case statusCode >= 300 && statusCode < 400:
      return status.blue;
    case statusCode >= 400 && statusCode < 600:
      return status.red;
    default:
      return status;
  }
}

function getMethod(tokens, req: Request, res: Response) {
  const method = req.method;
  const methodString = `${tokens.method(req, res)}`;

  switch (method) {
    case "DELETE":
      return methodString.red;
    case "POST":
      return methodString.blue;
    case "PUT":
      return methodString.blue;
    default:
      return methodString.green;
  }
}

export default morgan((tokens, req: Request, res: Response) => {
  return [
    "[Log]".green,
    getMethod(tokens, req, res),
    tokens.url(req, res),
    getStatus(tokens, req, res),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});
