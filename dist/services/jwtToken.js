"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivationToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const createActivationToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' });
};
exports.createActivationToken = createActivationToken;
//# sourceMappingURL=jwtToken.js.map