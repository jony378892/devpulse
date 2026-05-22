import type { Application } from "express";
import express from "express";
import invalidRoute from "./middleware/invalid-route.ts";
import cookieParser from "cookie-parser";
import { AuthRoute } from "./modules/auth/auth.route.ts";
import { issueRoute } from "./modules/issue/issue.route.ts";

export const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route Handler
app.use("/api/auth", AuthRoute);
app.use("/api/issues", issueRoute);

// If not route found
app.use(invalidRoute);
