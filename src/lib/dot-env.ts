import "dotenv/config";
import { cleanEnv, num, str } from "envalid";

export const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  PORT: num(),
  ROOT_ADMIN_USERNAME: str(),
  ROOT_ADMIN_PASSWORD: str(),
  DATABASE_HOST: str(),
  DATABASE_USER: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_PORT: num(),
  DATABASE_NAME: str(),
  CONNECTION_LIMIT: num(),
  JWT_SECRET: str(),
  AWS_ACCESS_KEY: str(),
  AWS_SECRET_KEY: str(),
  AWS_S3_BUCKET: str(),
});
