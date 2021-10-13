/* eslint-disable no-throw-literal */
/*****************************************************************************
 * @description   : It is used to taking the request from the client side and give the response and
 *                  validating whether the input is correct or not.
 * @file          : note.controller.js
 * @author        : Vivek Varshney
 *****************************************************************************/

const noteService = require("../service/note.services");
const logger = require("../logger/logger");
const labelController = require("./label.conroller");
// const labelService = require("../service/label.services");
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
          userId: req.userData.dataForToken.id,
          title: req.body.title,
          description: req.body.description
        };
        console.log("note for controller :: " + note);
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

    /**
    * @description function written to get notes into the database
    * @param {*} a valid req body is expected
    * @param {*} res
    * @returns response
    */

  getNote = (req, res) => {
    try {
      const id = { id: req.userData.dataForToken.id };
      noteService.getNote((id), (err, data) => {
        if (err) {
          logger.error("Failed to get all notes");
          return res.status(400).json({
            message: "failed to get note",
            success: false
          });
        } else {
          logger.info("All notes retrieved");
          return res.status(201).json({
            message: "Notes retieved succesfully",
            success: true,
            data: data
          });
        }
      });
    } catch {
      logger.error("Error occured while retrieving notes");
      return res.status(500).json({
        message: "internal Error"
      });
    }
  }

  /**
    * @description function written to get notes by id into the database
    * @param {*} a valid req body is expected
    * @param {*} res
    * @
    */

  getNoteById = async (req, res) => {
    try {
      const id = { userId: req.userData.dataForToken.id, noteId: req.params.id };
      console.log(`Test: ${req.userData.dataForToken.id} and ${req.params.id}`);
      const data = await noteService.getNoteById(id);
      if (data.message) {
        return res.status(404).json({
          message: "Note not found",
          success: false
        });
      }
      return res.status(200).json({
        message: "Note retrieved succesfully",
        success: true,
        data: data
      });
    } catch (err) {
      return res.status(500).json({
        message: "Note not updated",
        success: false,
        data: err
      });
    }
  }

  /**
    * @description function written to update notes by id into the database
    * @param {*} a valid req body is expected
    * @param {*} res
    * @
    */

  updateNoteById =(req, res) => {
    try {
      const updateNote = {
        id: req.params.id,
        userId: req.userData.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
      console.log("note for controller :: " + updateNote);
      noteService.updateNoteById(updateNote, (error, data) => {
        if (error) {
          logger.error("failed to update note");
          return res.status(400).json({
            message: "failed to update note",
            success: false
          });
        } else {
          logger.info("Successfully inserted note");
          return res.status(201).send({
            message: "Successfully update note",
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

  /**
    * @description function written to delete notes by id into the database
    * @param {*} a valid req body is expected
    * @param {*} res
    * @
    */

  deleteNoteById = async (req, res) => {
    try {
      const id = { userId: req.userData.dataForToken.id, noteId: req.params.id };
      console.log(`Test: ${req.userData.dataForToken.id} and ${req.params.id}`);
      const data = await noteService.deleteNoteById(id);
      if (data.message) {
        return res.status(404).json({
          message: "Note not found",
          success: false
        });
      }
      return res.status(200).json({
        message: "Note Deleted succesfully",
        success: true,
        data: data
      });
    } catch (err) {
      return res.status(500).json({
        message: "Note not updated",
        success: false,
        data: err
      });
    }
  }

  addLabelById = async (req, res) => {
    try {
      const id = {
        noteId: req.params.id,
        labelId: req.body.Id,
        userId: req.userData.dataForToken.id
      };
      console.log(id);
      const labels = await noteService.addLabelById(id);
      await labelController.addNoteId(id);
      res.status(200).send({
        message: "Label added",
        success: true,
        data: labels
      });
    } catch (err) {
      res.status(500).send({
        message: "Label wasnt added",
        success: false,
        error: err
      });
    }
  }
}

module.exports = new Note();
