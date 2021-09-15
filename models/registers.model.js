const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// now we need to create a collection

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;

class userModel {
  registerUser = (userDetails, callback) => {
    const newUser = new Register({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
    });
    try {
      Register.findOne({ email: userDetails.email }, (error, data) => {
        if (data) {
          return callback("User already exits", null);
        } else {
          newUser.save();
          return callback(null, newUser);
        }
      });
    } catch (error) {
      return callback("Internal error !!", null);
    }
  };
}

module.exports = new userModel();
