const helper = require("../middleware/hash&token");
const noteService = require("../service/note.services");
class Note {
    createNote =(req, res) => {
      try {
        const header = req.headers.authorization;
        const myArr = header.split(" ");
        const token = myArr[1];
        const tokenData = helper.getEmailFromToken(token);
        const note = {
          userId: tokenData.dataForToken.id,
          title: req.body.title,
          description: req.body.description
        };
        noteService.createNote(note, (err, data) => {
          if (err) {
            return res.status(500).json({
              message: "failed to post note",
              success: false
            });
          } else {
            return res.status(201).send({
              message: "Successfully inserted note",
              success: true,
              data: data
            });
          }
        });
      } catch {
        return res.status(500).json({
          message: "Error occured",
          success: false
        });
      }
    }
}

module.exports = new Note();
