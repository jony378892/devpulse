import type { Application } from "express";
import express, { urlencoded } from "express";
import invalidRoute from "./middleware/invalid-route.ts";
import cookieParser from "cookie-parser";

export const app: Application = express();

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// If not route found
app.use(invalidRoute);
