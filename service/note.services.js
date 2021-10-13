/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm run server
 *
 * Purpose      : Controls the operations of notes creation and other CRUD
 *
 * @description: It is use to taking the request from the client and gives the response.
 *
 * @file        : note.services.js
 * @overview    : controls notes creation task
 * @module      : this is necessary to register new user and give authorization.
 * @author      : Vivek Varshney
 *********************************************************************/

const logger = require("../logger/logger");
const noteModel = require("../models/note.model");

class Service {
  /**
    * @description this function is written to send data models
    * @param {*} A valid notesData is expected
    * @returns error if it has error else data
    */
    createNote = (note, callback) => {
      noteModel.createNote(note, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      }
      );
    }

    getNote = (id, callback) => {
      noteModel.getNote(id, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    }

    getNoteById = async (id) => {
      try {
        return await noteModel.getNoteById(id);
      } catch (err) {
        return err;
      }
    }

    updateNoteById = (updateNote, callback) => {
      noteModel.updateNoteById(updateNote, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      }
      );
    }

    deleteNoteById = async (id) => {
      try {
        return await noteModel.deleteNoteById(id);
      } catch (err) {
        return err;
      }
    }

    addLabelById = async (id) => {
      try {
        const data = await noteModel.addLabelById(id);
        return data;
      } catch (error) {
        return error;
      }
    }
}
module.exports = new Service();
