"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP_PASSWORD = exports.SMTP_FROMMAIL = exports.SMTP_MODE = exports.ACCESS_TOKEN_SECRET = exports.LOGIN_TOKEN_SECRET = exports.ACTIVATION_TOKEN_SECRET = exports.emailVerify = exports.CLIENT_URL = exports.PORT = exports.MongoURI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MongoURI = process.env.MONGO_URI;
exports.PORT = process.env.PORT;
exports.CLIENT_URL = process.env.CLIENT_URL;
exports.emailVerify = false;
// Token
exports.ACTIVATION_TOKEN_SECRET = process.env.ACTIVATION_TOKEN_SECRET || "";
exports.LOGIN_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
// Mail
exports.SMTP_MODE = process.env.SMTP_MODE || "none";
exports.SMTP_FROMMAIL = process.env.SMTP_FROMMAIL || "";
exports.SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
//# sourceMappingURL=config.js.map