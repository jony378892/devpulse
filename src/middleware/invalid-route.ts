import type { Request, Response } from "express";

const invalidRoute = (req: Request, res: Response) => {
  res.status(400).json({
    success: true,
    message: "Welcome to dev pulse!",
  });
};

export default invalidRoute;
