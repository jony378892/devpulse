import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../../db/index.ts";
import { loginUserIntoDB, signupUserIntoDB } from "./auth.service.ts";

const signupUser = async (req: Request, res: Response) => {
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

const loginUser = async (req: Request, res: Response) => {
  try {
    const { accessToken, userDetails } = await loginUserIntoDB(req.body);

    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: accessToken,
        user: {
          ...userDetails,
        },
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "User Login not successful",
      error: error.message,
    });
  }
};

export { signupUser, loginUser };
