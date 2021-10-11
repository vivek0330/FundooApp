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
}

module.exports = new Model();
