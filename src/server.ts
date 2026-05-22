import type { Application, Request, Response } from "express";
import express from "express";
import { config } from "./config/index.ts";

const app: Application = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Hello world!",
  });
});

app.use((req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route does not exists!",
  });
});

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
