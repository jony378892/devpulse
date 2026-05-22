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

const getSingleIssueFromDB = async (id: string) => {
  const searchId = Number(id);

  const result = await pool.query(
    `
    SELECT * FROM issues where id=$1
    `,
    [searchId],
  );
  return result;
};

const updateIssueFromDB = async (
  id: string,
  payload: {
    title: string;
    description: string;
    type: string;
  },
) => {
  const { title, description, type } = payload;

  const status = "open";

  const result = await pool.query(
    `
        UPDATE issues 
        SET 
        title=COALESCE($1,title),
        description=COALESCE($2,description),
        type=COALESCE($3,type) 
        WHERE status=$4 RETURNING *
        `,
    [title, description, type, status],
  );

  return result;
};

export {
  createIssueToDB,
  getAllIssueFromDB,
  getSingleIssueFromDB,
  updateIssueFromDB,
};
