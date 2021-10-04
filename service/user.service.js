/* eslint-disable node/no-callback-literal */
/* eslint-disable node/handle-callback-err */
const userModel = require("../models/registers.model.js");
const bcrypt = require("bcrypt");
const helper = require("../helpers/hash&token.js");
const logger = require("../logger/logger");
const nodemailer = require("../helpers/nodemailer");

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
          const token = helper.token(signInInfo);
          logger.info("getting token");
          return callback(null, token);
        }
      } else {
        logger.info("Please check your email and password first !!");
        return callback("Please check your email and password !!");
      }
    });
  };

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

   resetPassword = (userData, callback) => {
     helper.getEmailFromToken(userData.token, (error, data) => {
       if (error) {
         return callback(error, null);
       } else {
         const inputData = {
           email: data.dataForToken.email,
           password: userData.password
         };
         userModel.resetPassword(inputData, (error, data) => {
           if (error) {
             logger.error(error);
             return callback(error, null);
           } else {
             return callback(null, data);
           }
         });
       }
     });
   }
}

module.exports = new UserService();
