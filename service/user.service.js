/* eslint-disable node/no-callback-literal */
/* eslint-disable node/handle-callback-err */
const userModel = require("../models/registers.model.js");
const bcrypt = require("bcrypt");
const utility = require("../helpers/hash&token.js");
const logger = require("../logger/logger");

class UserService {
  registerUser = (user, callback) => {
    userModel.registerUser(user, (error, data) => {
      if (error) {
        logger.error("getting some error");
        return callback(error, null);
      } else {
        logger.info("getting data");
        return callback(null, data);
      }
    });
  };

  // user sign in
  signInUser = (signInInfo, callback) => {
    userModel.signInUser(signInInfo, (error, data) => {
      if (data) {
        // const check = signInInfo.password == data.password;
        const check = bcrypt.compare(signInInfo.pasword, data.pasword);

        if (check === false) {
          logger.error("invalid Password");
          return callback("invalid Password", null);
        } else {
          utility.token(signInInfo, (error, token) => {
            if (error) {
              throw error;
            } else {
              logger.info("token generate");
              return callback(null, token);
            }
          });
        }
      } else {
        logger.info("Please check your email and password !!");
        return callback("Please check your email and password !!");
      }
    });
  };
}

module.exports = new UserService();
