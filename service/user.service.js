/* eslint-disable node/no-callback-literal */
/* eslint-disable node/handle-callback-err */
const userModel = require("../models/registers.model.js");
const bcrypt = require("bcrypt");
const helper = require("../middleware/hash&token.js");
const logger = require("../logger/logger");
const nodemailer = require("../middleware/nodemailer");

class UserService {
  registerUser = (user, callback) => {
    userModel.registerUser(user, (error, data) => {
      if (error) {
        logger.error("getting some error registration");
        return callback(error, null);
      } else {
        logger.info("getting user data");
        return callback(null, data);
      }
    });
  };

  // login
   userLogin = (InfoLogin, callback) => {
     userModel.loginModel(InfoLogin, (error, data) => {
       if (data) {
         // validate will take boolean value true and false
         bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
           if (!validate) {
             logger.error(error);
             return callback(error + "Invalid Password", null);
           } else {
             logger.info(" token generated ");
             const token = helper.token(data);
             return callback(null, token);
           }
         });
       } else {
         logger.error(error);
         return callback(error);
       }
     });
   }

   forgotPassword = (email, callback) => {
     userModel.forgotPassword(email, (error, data) => {
       if (error) {
         logger.error(error);
         return callback(error, null);
       } else {
         return callback(null, nodemailer.sendEmail(data));
       }
     });
   };

   resetPassword = (inputData, callback) => {
     userModel.resetPassword(inputData, (error, data) => {
       if (error) {
         logger.error("password not update in model");
         return callback(error, null);
       } else {
         logger.info("getting upadated password in data");
         return callback(null, data);
       }
     });
   }
}

module.exports = new UserService();
