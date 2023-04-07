import route from "./modules/routes.mjs";
import express from "express";
import cors from "cors";
import { databaseConnect } from "./database/dbConfig.mjs"
const app = express();

app.use(express.json());

app.use(cors());
app.options("*", cors());

databaseConnect();

app.use("/api", route);

app.listen(8090, () => {
  console.log("It's running at http://127.0.0.1:8090");
});