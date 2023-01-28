import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

interface bodyParser {
  limit: string;
  extended: boolean;
  parameterLimit: number;
}

interface bodyParserText {
  limit: string;
}

import userRoutes from "./src/router/users";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(
  bodyParser.urlencoded(<bodyParser>{
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text(<bodyParserText>{ limit: "200mb" }));
app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
