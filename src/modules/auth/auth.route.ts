import { Router, type Request, type Response } from "express";
import { loginUser, signupUser } from "./auth.controller.ts";

const router = Router();

// signup route handler
router.post("/signup", signupUser);
router.post("/login", loginUser);

export const AuthRoute: Router = router;
