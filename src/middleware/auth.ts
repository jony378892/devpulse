import type { NextFunction, Request, Response } from "express";
import type { User, UserRole } from "../utils/types.ts";
import { config } from "../config/index.ts";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db/index.ts";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  // console.log(token);
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access!!",
    });
  }

  const decoded = jwt.verify(
    token as string,
    config.jwt_secret as string,
  ) as JwtPayload;

  const userData = await pool.query(
    `
     SELECT * FROM users WHERE email=$1   
        `,
    [decoded.email],
  );

  // console.log(userData);

  const user = userData.rows[0];

  // console.log(user);
  if (userData.rows.length === 0) {
    res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  next();
};

export { auth };
