"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// DB Config
// const db = require("../config/config").mongoURI;
const config_1 = require("../config/config");
// Connect to MongoDB
const db = mongoose_1.default
    .connect(config_1.MongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.warn(err));
exports.default = db;
//# sourceMappingURL=index.js.map