import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createIssueToDB, getAllIssueFromDB } from "./issue.service.ts";
import type { User } from "../../utils/types.ts";

const createIssue = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    const result = await createIssueToDB(req.body, req.user);

    const createdIssue = result.rows[0];
    // console.log(createdIssue);

    if (result.rows.length === 0) {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: {
        ...createdIssue,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Can't create issue",
      error: error.message,
    });
  }
};

const getAllIssue = async (req: Request, res: Response) => {
  try {
    const result = await getAllIssueFromDB();
    const issues = result.rows;

    res.status(200).json({
      success: true,
      data: issues,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Can't fetch issues",
      error: error.message,
    });
  }
};

export { createIssue, getAllIssue };
