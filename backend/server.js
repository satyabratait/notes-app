import route from "./modules/routes.js";
import express from "express";
import cors from "cors";
import { databaseConnect } from "./database/dbConfig.js";
import { baseError } from "./modules/errorHandling.js";
const app = express();

app.use(express.json());

app.use(cors());
app.options("*", cors());

databaseConnect();

app.use("/api", route);

app.use((req, res, next) => {
  next(new baseError("page not found", 404, null, false));
});

app.use((error, req, res, next) => {
  if (error) {
    res.status(error.status).send({
      data: error.data,
      message: error.message,
      status: error.status,
      success: error.success,
    });
  }
});

app.listen(8090, () => {
  console.log("It's running at http://127.0.0.1:8090");
});
