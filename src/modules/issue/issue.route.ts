import { Router } from "express";
import { auth } from "../../middleware/auth.ts";
import {
  createIssue,
  deleteIssue,
  getAllIssue,
  getSingleIssue,
  updateIssue,
} from "./issue.controller.ts";

const router = Router();

router.post("/", auth, createIssue);
router.get("/", getAllIssue);
router.get("/:id", getSingleIssue);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

export const issueRoute: Router = router;
