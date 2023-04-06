import { model, Schema } from "mongoose";

const notesDataSchema = new Schema({
  title: String,
  content: String,
});

export default model("notesDataSchema", notesDataSchema);
