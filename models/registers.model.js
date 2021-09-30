/* eslint-disable comma-dangle */
/* eslint-disable node/no-callback-literal */
/* eslint-disable node/handle-callback-err */
/* eslint-disable new-cap */
/*******************************************************************************************
 * @description   : It is use to create schema in data base and doing schema vlidation and
 *                  encrypting password (Hashing).
 * @module        : mongoose, bcrypt, jsonwebtoken
 * @file          : registers.model.js
 * @author        : Vivek Varshney
 ******************************************************************************************/

// importing mongoose, bcrypt, jsonwebtoken module
const mongoose = require("mongoose");
const utility = require("../helpers/hash&token.js");
const logger = require("../logger/logger");

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
    resetLink: {
      data: String,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

// now we need to create a collection
const Register = new mongoose.model("Register", userSchema);

module.exports = Register;

class UserModel {
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
          newUser.save((error, data) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, data);
            }
          });
          // return callback(null, newUser);
        } else {
          throw error;
        }
      });
    } catch (error) {
      logger.info("Internal Error");
      return callback("Internal error", null);
    }
  };

  /**
   * @description     : It uses to login the registered user
   * @param           : signInData, callback
   */
  signInUser = (signInData, callback) => {
    Register.findOne({ email: signInData.email }, (error, data) => {
      if (error) {
        logger.error("Something is wrong");
        return callback(error, null);
      } else if (!data) {
        logger.error("Invalid Credentials");
        return callback("invalid Credentials", null);
      } else {
        logger.info("Something is good");
        return callback(null, data);
      }
    });
  };

  forgotPassword = (data, callback) => {
    Register.findOne({ email: data.email }, (err, data) => {
      if (err || !data) {
        logger.error("User with email id doesnt exists");
        return callback("User with email id doesnt exists", null);
      } else {
        return callback(null, data);
      }
    });
  };
}

module.exports = new UserModel();
