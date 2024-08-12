import dotenv from "dotenv";

dotenv.config();
export const MongoURI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;

export const emailVerify = false
// Token
export const ACTIVATION_TOKEN_SECRET = process.env.ACTIVATION_TOKEN_SECRET || "";
export const LOGIN_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

// Mail
export const SMTP_MODE = process.env.SMTP_MODE || "none";
export const SMTP_FROMMAIL = process.env.SMTP_FROMMAIL || "";
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";