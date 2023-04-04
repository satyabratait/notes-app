import notesDataModel from "./databaseSchema.mjs";

export async function createNote(title, content) {
  notesDataModel.create({
    title,
    content,
  });
}

export async function updateNote(id,title,content) {
  const data = await notesDataModel.findById(id);
  if (data) {
    data.title = title;
    data.content = content;
    const result = await data.save();
    console.log(result);
    return JSON.stringify({
        message: "updated success",
        result
    });
  }
}

export async function deleteNote(id) {
    const data = await notesDataModel.findById(id);
    if (data) {
        await data.deleteOne(id);
        return JSON.stringify({
            message: "data deleted"
        });
    }
}

export async function readNotes() {
  try {
    const data = await notesDataModel.find();
    if (data) {
      return JSON.stringify({
        data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
