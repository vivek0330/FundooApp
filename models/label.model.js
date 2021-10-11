/* eslint-disable prefer-promise-reject-errors */
const mongoose = require("mongoose");

const labelSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Register" },

  labelName: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const LabelRegister = mongoose.model("LabelRegister", labelSchema);

class Model {
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

      labelGetAll = (id) => {
        return new Promise((resolve, reject) => {
          LabelRegister.find({ userId: id }).then((data) => {
            resolve(data);
          })
            .catch(() => reject());
        });
      }

      labelGetById = async (id) => {
        try {
          return await LabelRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
        } catch (err) {
          return err;
        }
      }
}

module.exports = new Model();
