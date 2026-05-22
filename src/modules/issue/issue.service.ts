import { pool } from "../../db/index.ts";
import type { Status, User } from "../../utils/types.ts";

const createIssueToDB = async (payload: any, user: any) => {
  const { title, description, type } = payload;

  //   console.log(user);
  if (!user) {
    throw new Error("Can't create issue!");
  }

  const { id } = user;

  const status: Status = "open";

  const createdIssue = await pool.query(
    `
        INSERT INTO issues(title, description, type, status, reporter_id) VALUES($1, $2, $3, $4, $5) RETURNING *
        `,
    [title, description, type, status, id],
  );

  return createdIssue;
};

const getAllIssueFromDB = async () => {
  const result = await pool.query(`
        SELECT * FROM issues
        `);

  if (result.rows.length === 0) {
    throw new Error("Error fetching issue");
  }

  return result;
};

export { createIssueToDB, getAllIssueFromDB };
