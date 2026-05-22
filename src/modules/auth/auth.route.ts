import { Router, type Request, type Response } from "express";
import { signup } from "./auth.controller.ts";

const router = Router();

// signup route handler
router.post("/signup", signup);

export const AuthRoute: Router = router;
