import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../../db/index.ts";
import { signupUserIntoDB } from "./auth.service.ts";

const signup = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const result: any = await signupUserIntoDB(req.body);

    if (result) {
      delete result.password;
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: {
        ...result,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { signup };
