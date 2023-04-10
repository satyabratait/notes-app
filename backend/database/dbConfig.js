import mongoose from "mongoose";
import { dbData } from "../config.js";

const url = `mongodb+srv://${dbData.username}:${dbData.password}@cluster0.efmi4af.mongodb.net/${dbData.dbName}?retryWrites=true&w=majority`;

export async function databaseConnect() {
  await mongoose
    .connect(url, {
      useNewUrlParser: true, // default recommended options
      useUnifiedTopology: true,
    })
    .then((e) => console.log("MongoDB ready"))
    .catch(console.error);
}
