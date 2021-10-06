const mongoose = require("mongoose");

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
class Model {
    createNote = (info, callback) => {
      const note = new NoteRegister({
        userId: info.userId,
        title: info.title,
        description: info.description
      });
      note.save((error, data) => {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }
}

module.exports = new Model();
