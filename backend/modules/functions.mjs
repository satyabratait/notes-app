import notesDataModel from "./databaseSchema.mjs";

export async function createNote(title, content) {
  try {
    const result = await notesDataModel.create({
      title,
      content,
    });
    if (result) {
      return JSON.stringify({
        status: 201,
        message: "note added sucessfully",
      });
    } else {
      return JSON.stringify({
        status: 204,
        message: "note cannot be created",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateNote(id, title, content) {
  try {
    const data = await notesDataModel.findById(id);
  if (data) {
    data.title = title;
    data.content = content;
    const result = await data.save();
    console.log(result);
    if (result) {
      return JSON.stringify({
        status: 201,
        message: "note updated sucessfully",
        result,
      });
    } else {
      return JSON.stringify({
        status: 204,
        message: "note cannot be updated",
        result,
      });
    }
  }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNote(id) {
  console.log(id);
  try {
    const data = await notesDataModel.findByIdAndDelete(id);
  if (data) {
    return JSON.stringify({
      status: 200,
      message: "note deleted sucessfully",
      data,
    });
  } else {
    return JSON.stringify({
      status: 204,
      message: "note not found",
      data,
    });
  }
  } catch (error) {
    console.log(error);
  }
}

export async function readNotes() {
  try {
    const data = await notesDataModel.find();
    if (data) {
      return JSON.stringify({
        status: 200,
        message: "all notes",
        data,
      });
    } else {
      return JSON.stringify({
        status: 204,
        message: "notes cannot be fetched",
        data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getOneData(id) {
  try {
    const data = await notesDataModel.findById(id);
    if (data) {
      return JSON.stringify({
        status: 200,
        message: "note found",
        data,
      });
    } else {
      return JSON.stringify({
        status: 204,
        message: "note cannot be fetched",
        data,
      });
    }
  } catch (error) {}
}
