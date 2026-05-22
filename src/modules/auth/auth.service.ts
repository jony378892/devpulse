import bcrypt from "bcryptjs";
import type { User } from "../../utils/types.ts";
import { pool } from "../../db/index.ts";
import jwt from "jsonwebtoken";
import { config } from "../../config/index.ts";

const signupUserIntoDB = async (payload: User) => {
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

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `
    SELECT * FROM users where email=$1`,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials!");
  }

  const { password: userPassword, ...userDetails } = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, userPassword);

  if (!matchPassword) {
    throw new Error("Invalid Credentials!");
  }

  // Generated token
  const jwtPayload = {
    id: userDetails.id,
    name: userDetails.name,
    email: userDetails.email,
    role: userDetails.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "1d",
  });

  return { accessToken, userDetails };
};

export { signupUserIntoDB, loginUserIntoDB };
