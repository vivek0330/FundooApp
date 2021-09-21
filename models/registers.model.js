const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utility = require("../utility/hash&token.js");

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
      type: String,
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
  /**
   * @description     : It is use to create and save a newUser in data base.
   * @param           : userDetails, callback
   * @method          : save to save the coming data in data base
   */
  registerUser = (userDetails, callback) => {
    const newUser = new Register({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
    });
    try {
      utility.hashing(userDetails.password, (error, hash) => {
        if (hash) {
          newUser.password = hash;
          newUser.save();
          return callback(null, newUser);
        } else {
          throw err;
        }
      });
    } catch (error) {
      return callback("Internal error", null);
    }
  };

  signInUser = (signInData, callback) => {
    Register.findOne({ email: signInData.email }, (error, data) => {
      if (error) {
        return callback(error, null);
      } else if (!data) {
        return callback("invalid Credentials", null);
      } else {
        return callback(null, data);
      }
    });
  };
}

module.exports = new userModel();
