import notesDataModel from "./databaseSchema.js";
import { baseError } from "./errorHandling.js";

export async function createNote(title, content, next) {
  try {
    const result = await notesDataModel.create({
      title,
      content,
    });
    if (result) {
      return JSON.stringify({
        message: "note created",
        status: 200,
        data: null,
        success: true,
      });
    } else {
      next(new baseError("data not found", 204, result, false));
    }
  } catch (error) {
    next(new baseError(error.message, 404, null, false));
    console.log(error);
  }
}

export async function updateNote(id, title, content, next) {
  try {
    const data = await notesDataModel.findById(id);
    if (data) {
      data.title = title;
      data.content = content;
      const result = await data.save();
      console.log(result);
      if (result) {
        return JSON.stringify({
          message: "note updated",
          status: 200,
          data,
          success: true,
        });
      } else {
        next(new baseError("data not found", 204, data, false));
      }
    }
  } catch (error) {
    console.log(error);
    next(new baseError(error.message, 404, null, false));
  }
}

export async function deleteNote(id, next) {
  console.log(id);
  try {
    const data = await notesDataModel.findByIdAndDelete(id);
    if (data) {
      return JSON.stringify({
        message: "note deleted",
        status: 200,
        data,
        success: true,
      });
    } else {
      next(new baseError("data not found", 204, data, false));
    }
  } catch (error) {
    next(new baseError(error.message, 404, null, false));
    console.log(error);
  }
}

export async function readNotes(next) {
  try {
    const data = await notesDataModel.find();
    if (data) {
      return JSON.stringify({
        message: "data found",
        status: 200,
        data,
        success: true,
      });
    } else {
      next(new baseError("data not found", 204, data, false));
    }
  } catch (err) {
    next(new baseError(err.message, 404, null, false));
    console.log(err);
  }
}

export async function getOneData(id, next) {
  try {
    const data = await notesDataModel.findById(id);
    if (data) {
      return JSON.stringify({
        message: "data found",
        status: 200,
        data,
        success: true,
      });
    } else {
      next(new baseError("data not found", 204, data, false));
    }
  } catch (error) {
    next(new baseError(error.message, 404, null, false));
  }
}
