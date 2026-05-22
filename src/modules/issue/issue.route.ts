import { Router } from "express";
import { auth } from "../../middleware/auth.ts";
import { createIssue, getAllIssue } from "./issue.controller.ts";

const router = Router();

router.post("/", auth, createIssue);
router.get("/", getAllIssue);

export const issueRoute: Router = router;
