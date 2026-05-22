import bcrypt from "bcryptjs";
import type { User } from "../../utils/types.ts";
import { pool } from "../../db/index.ts";

export const signupUserIntoDB = async (payload: User) => {
  const { name, email, password, role } = payload;

  const hashPassword = await bcrypt.hash(password, 10);

  const finalRole = role ?? "contributor";

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [name, email, hashPassword, finalRole],
  );

  return result.rows[0];
};
