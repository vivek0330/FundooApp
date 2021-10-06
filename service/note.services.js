const noteModel = require("../models/note.model");

class Service {
    createNote = (note, callback) => {
      noteModel.createNote(note, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      }
      );
    }
}
module.exports = new Service();
