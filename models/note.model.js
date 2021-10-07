const mongoose = require("mongoose");
const logger = require("../logger/logger");

const noteSchema = mongoose.Schema({

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
}

module.exports = new Model();
