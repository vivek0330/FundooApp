/*****************************************************************************
 * @description   : It is used to taking the request from the client side and give the response and
 *                  validating whether the input is correct or not.
 * @file          : note.controller.js
 * @author        : Vivek Varshney
 *****************************************************************************/

const noteService = require("../service/note.services");
const logger = require("../logger/logger");
class Note {
  /**
    * @description function written to create notes into the database
    * @param {*} a valid req body is expected
    * @param {*} res
    * @returns response
    */
    createNote =(req, res) => {
      try {
        const note = {
          userId: req.user.dataForToken.id,
          title: req.body.title,
          description: req.body.description
        };
        noteService.createNote(note, (error, data) => {
          if (error) {
            logger.error("failed to post note");
            return res.status(400).json({
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
