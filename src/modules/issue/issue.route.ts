import { Router } from "express";
import { auth } from "../../middleware/auth.ts";
import {
  createIssue,
  getAllIssue,
  getSingleIssue,
  updateIssue,
} from "./issue.controller.ts";

const router = Router();

router.post("/", auth, createIssue);
router.get("/", getAllIssue);
router.get("/:id", getSingleIssue);
router.put("/:id", updateIssue);

export const issueRoute: Router = router;
