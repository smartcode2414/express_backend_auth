import mongoose from "mongoose";

// DB Config
// const db = require("../config/config").mongoURI;
import { MongoURI } from "../config/config";

// Connect to MongoDB
const db = mongoose
            .connect(MongoURI)
            .then(() => console.log("MongoDB Connected"))
            .catch(err => console.warn(err));

export default db;