const helper = require("../middleware/hash&token");
const noteService = require("../service/note.services");
const logger = require("../logger/logger");
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
        noteService.createNote(note, (error, data) => {
          if (error) {
            logger.error("failed to post note");
            return res.status(401).json({
              message: "failed to post note",
              success: false
            });
          } else {
            logger.info("Successfully inserted note");
            return res.status(201).send({
              message: "Successfully inserted note",
              success: true,
              data: data
            });
          }
        });
      } catch {
        logger.error("Internal server error");
        return res.status(500).json({
          message: "Error occured",
          success: false
        });
      }
    }
}

module.exports = new Note();
