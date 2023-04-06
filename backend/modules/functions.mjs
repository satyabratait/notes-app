import notesDataModel from "./databaseSchema.mjs";

export async function createNote(title, content) {
  const result = await notesDataModel.create({
    title,
    content,
  });
  if (result) {
    return JSON.stringify({
      status: 201,
      message: "data added",
    });
  } else {
    return JSON.stringify({
      status: 204,
      message: "data cannot be created",
    });
  }
}

export async function updateNote(id, title, content) {
  const data = await notesDataModel.findById(id);
  if (data) {
    data.title = title;
    data.content = content;
    const result = await data.save();
    console.log(result);
    if (result) {
      return JSON.stringify({
        status: 201,
        message: "updated success",
        result,
      });
    } else {
      return JSON.stringify({
        status: 204,
        message: "data cannot be updated",
        result,
      });
    }
  }
}

export async function deleteNote(id) {
  console.log(id);
  const data = await notesDataModel.findByIdAndDelete(id);
  if (data) {
    return JSON.stringify({
      status: 200,
      message: "data deleted",
      data,
    });
  } else {
    return JSON.stringify({
      status: 204,
      message: "data not found",
      data,
    });
  }
}

export async function readNotes() {
  try {
    const data = await notesDataModel.find();
    if (data) {
      return JSON.stringify({
        status: 200,
        message: "all datas",
        data,
      });
    } else {
      return JSON.stringify({
        status: 204,
        message: "data cannot be fetched",
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
        message: "data found",
        data,
      });
    } else {
      return JSON.stringify({
        status: 204,
        message: "data cannot be fetched",
        data,
      });
    }
  } catch (error) {}
}
