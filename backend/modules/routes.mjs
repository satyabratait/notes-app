import express from "express";
import * as notesData from "./functions.mjs";

const route = express.Router();

route.get("/api", function (req, res) {
  res.send("api working");
});

route.get("/read", (req, res) => {
  notesData.readNotes().then((doc) => {
    res.send(doc);
  });
});

route.get("/oneData/:id", (req, res) => {
  const { id } = req.params;
  notesData.getOneData(id).then((doc) => {
    res.send(doc);
  });
});

route.post("/create", (req, res) => {
  const { title, content } = req.body;
  notesData.createNote(title, content).then((doc) => {
    res.send(doc);
  });
});

route.put("/update", (req, res) => {
  const { id, title, content } = req.body;
  console.log(id);
  notesData.updateNote(id, title, content).then((doc) => {
    res.send(doc);
  });
});

route.delete("/delete", (req, res) => {
  const { id } = req.body;
  console.log(id);
  notesData.deleteNote(id).then((doc) => {
    res.send(doc);
  });
});

export default route;