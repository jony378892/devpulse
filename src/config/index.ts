import path from "path";
import { configDotenv } from "dotenv";

configDotenv({
  path: path.join(process.cwd(), ".env"),
});

export const config = {
  connection_string: process.env.CONNECTION_STRING,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
};
