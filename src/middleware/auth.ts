import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../utils/types.ts";

const auth = (roles: UserRole) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(role);

    next();
  };
};
