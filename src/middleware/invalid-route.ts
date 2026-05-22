import type { Request, Response } from "express";

const invalidRoute = (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route does not exists!",
  });
};

export default invalidRoute;
