import mongoose from "mongoose";
import * as notesData from "./modules/functions.mjs";
import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.get("/notes/read", (req, res) => {
  notesData.readNotes().then((doc) => {
    res.send(doc);
  });
});

app.get("/notes/oneData/:id", (req, res) => {
  const { id } = req.params;
  notesData.getOneData(id).then((doc) => {
    res.send(doc);
  });
});

app.post("/notes/create", (req, res) => {
  const { title, content } = req.body;
  notesData.createNote(title, content).then((doc) => {
    res.send(doc);
  });
});

app.put("/notes/update", (req, res) => {
  const { id, title, content } = req.body;
  console.log(id);
  notesData.updateNote(id, title, content).then((doc) => {
    res.send(doc);
  });
});

app.delete("/notes/delete", (req, res) => {
  const { id } = req.body;
  console.log(id);
  notesData.deleteNote(id).then((doc) => {
    res.send(doc);
  });
});

app.listen(8090, function (req, res) {
  console.log("It's running at http://127.0.0.1:8090");
});

mongoose
  .connect(
    "mongodb+srv://satyabrata:satyabrata@cluster0.efmi4af.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true, // default recommended options
      useUnifiedTopology: true,
    }
  )
  .then((e) => console.log("MongoDB ready"))
  .catch(console.error);
