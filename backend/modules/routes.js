import express from "express";
import * as notesData from "./functions.js";

const route = express.Router();

route.get("/", function (req, res,next) {
  res.send("api working");
});

route.get("/read", (req, res, next) => {
  notesData.readNotes(next).then((doc) => {
    res.send(doc);
  });
});

route.get("/oneData/:id", (req, res, next) => {
  const { id } = req.params;
  notesData.getOneData(id, next).then((doc) => {
    res.send(doc);
  });
});

route.post("/create", (req, res, next) => {
  const { title, content } = req.body;
  notesData.createNote(title, content, next).then((doc) => {
    res.send(doc);
  });
});

route.put("/update", (req, res, next) => {
  const { id, title, content } = req.body;
  console.log(id);
  notesData.updateNote(id, title, content, next).then((doc) => {
    res.send(doc);
  });
});

route.delete("/delete", (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  notesData.deleteNote(id, next).then((doc) => {
    res.send(doc);
  });
});

export default route;