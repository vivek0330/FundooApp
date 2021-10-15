/* eslint-disable prefer-promise-reject-errors */

/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm run server
 *
 * Purpose      : Describing the schema for database.
 *
 * @description
 *
 * @file        : models/label.model.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : this is necessary to perform CRUD operations and store the data
 * @author      : Vivek Varshney
 *********************************************************************/
const mongoose = require("mongoose");

const labelSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Register" },

  noteId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "NoteRegister" }]
  },

  labelName: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const LabelRegister = mongoose.model("LabelRegister", labelSchema);

class Model {
  /**
      * @description function written to create label
      * @param {*} labelData
      * @returns data else if returns error
      */
     labelCreate = (data) => {
       return new Promise((resolve, reject) => {
         const label = new LabelRegister({
           userId: data.userId,
           labelName: data.labelName
         });
         label.save().then((data) => resolve(data))
           .catch(() => reject());
       });
     }

     /**
      * @description function written to get all labels
      * @returns promises else if returns reject
      */
      labelGetAll = (id) => {
        return new Promise((resolve, reject) => {
          LabelRegister.find({ userId: id }).then((data) => {
            resolve(data);
          })
            .catch(() => reject());
        });
      }

      /**
      * @description function written to get label by ID
      * @param {*} Id
      * @returns data else if returns error
      */
      labelGetById = async (id) => {
        try {
          return await LabelRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
        } catch (err) {
          return err;
        }
      }

      /**
      * @description function written to update label name
      * @param {*} updateLabel
      * @param {*} callback
      * @returns data else if returns error
      */
      updateLabelById = (updateLabel, callback) => {
        try {
          LabelRegister.findByIdAndUpdate(updateLabel.id, { labelName: updateLabel.labelName }, { new: true }, (err, data) => {
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

      /**
      * @description function written to delete label
      * @param {*} id
      * @returns error in the case of error occurrence
      */
      labelDeleteById = async (id) => {
        try {
          return await LabelRegister.findOneAndDelete({ $and: [{ _id: id.noteId }, { userId: id.userId }] }, { new: true });
        } catch (err) {
          return err;
        }
      }

      async addNoteId (id) {
        try {
          const data = await LabelRegister.findByIdAndUpdate(id.labelId, { $push: { noteId: id.noteId } }, { new: true });
          console.log(data);
        } catch (err) {
          return err;
        }
      }
}

module.exports = new Model();
