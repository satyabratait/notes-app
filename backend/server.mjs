import mongoose from "mongoose";
import * as notesData from "./modules/functions.mjs";
import express from "express";
const app = express();

app.get('/notes/read', (req,res) => {
    notesData.readNotes().then((doc) =>{
        res.send(doc);
    })
})

app.post('/notes/create', (req,res) => {
    const {title, content} = req.body;
    notesData.createNote(title,content);
    // res.send(notesData.readNotes());
});

app.put('/notes/update', (req,res) => {
    const {id,title,content} = req.body;
    notesData.updateNote(id,title,content);
    // res.send(notesData.readNotes());
})

app.delete('/notes/delete',(req,res) => {
    const id = req.body;
    notesData.deleteNote(id);
    // res.send(notesData.readNotes());
})


app.listen(8090, function (req,res) {
    console.log("It's running at http://127.0.0.1:8090");
})

mongoose.connect(
    "mongodb+srv://satyabrata:satyabrata@cluster0.efmi4af.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser: true, // default recommended options
    useUnifiedTopology: true,
  }
)
.then((e) => console.log("MongoDB ready"))
.catch(console.error);