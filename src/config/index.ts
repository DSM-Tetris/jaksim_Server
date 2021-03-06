import { config } from "dotenv";

config();

export default {
  SERVER_PORT: process.env.SERVER_PORT || "",
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
  EMAIL: process.env.EMAIL || "",
  PASSWORD_SALT: process.env.PASSWORD_SALT || "",
  REDIS_HOST: process.env.REDIS_HOST || "",
  REDIS_PORT: process.env.REDIS_PORT || "",
  REDIS_PASS: process.env.REDIS_PASS || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_ACCESS_EXP: process.env.JWT_ACCESS_EXP || "",
  JWT_REFRESH_EXP: process.env.JWT_REFRESH_EXP || ""
};