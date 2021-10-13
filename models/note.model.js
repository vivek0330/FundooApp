const mongoose = require("mongoose");
const logger = require("../logger/logger");

const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Register" },

  labelId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "LabelRegister" }]
  },

  title: {
    type: String
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  }

}, {
  timestamps: true
}
);

const NoteRegister = mongoose.model("NoteRegister", noteSchema);

// created a class to write functions
class Model {
    /**
   * @description function written to create notes into database
   * @param {*} a valid notesData is expected
   * @returns saved data or if error returns error
   */
    createNote = (info, callback) => {
      const note = new NoteRegister({
        userId: info.userId,
        title: info.title,
        description: info.description
      });
      note.save((error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }

    getNote = (id, callback) => {
      NoteRegister.find({ userId: id.id }, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    }

    getNoteById = async (id) => {
      try {
        return await NoteRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
      } catch (err) {
        return err;
      }
    }

    updateNoteById = (updatedNote, callback) => {
      try {
        NoteRegister.findByIdAndUpdate(updatedNote.id, { title: updatedNote.title, description: updatedNote.description }, { new: true }, (err, data) => {
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, data);
          }
        });
      } catch (err) {
        return callback(err, null);
      }
    }

    deleteNoteById = async (id) => {
      try {
        return await NoteRegister.findOneAndDelete({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
      } catch (err) {
        return err;
      }
    }

    addLabelById = async (id) => {
      try {
        const data = await NoteRegister.findByIdAndUpdate(id.noteId, { $push: { labelId: id.labelId } });
        console.log(data);
      } catch (error) {
        return error;
      }
    }

     deleteLabel = async (id) => {
       try {
         return await NoteRegister.findByIdAndUpdate(id.noteId,
           { $pull: { labelId: id.labelId } }, { new: true });
       } catch (error) {
         return error;
       }
     }
}
module.exports = new Model();
