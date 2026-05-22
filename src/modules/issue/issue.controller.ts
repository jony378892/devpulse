import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  createIssueToDB,
  getAllIssueFromDB,
  getSingleIssueFromDB,
  updateIssueFromDB,
} from "./issue.service.ts";
import type { User } from "../../utils/types.ts";
import { pool } from "../../db/index.ts";

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

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getSingleIssueFromDB(id as string);

    const issue = result.rows[0];

    const reporterResponse = await pool.query(
      `
        SELECT id, name, role FROM users WHERE id=$1
        `,
      [issue.reporter_id],
    );

    const { id: reporter_id, name, role } = reporterResponse.rows[0];

    const modifiedIssue = {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: {
        id: reporter_id,
        name,
        role,
      },
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };

    res.status(200).json({
      success: true,
      data: modifiedIssue,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Can't fetch issue",
      error: error.message,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await updateIssueFromDB(id as string, req.body);
    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Can't Update issue",
      error: error.message,
    });
  }
};

export { createIssue, getAllIssue, getSingleIssue, updateIssue };
