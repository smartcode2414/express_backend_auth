import express, { Express } from "express";
import cors from 'cors';

import routes from "./routes"

// Connect to mongodb
import db from './db';
  db;

const app: Express = express();
const port: Number = process.env.PORT ? Number(process.env.PORT) : 6000;


// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('api', routes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})

