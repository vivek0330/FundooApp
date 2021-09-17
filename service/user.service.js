const userModel = require("../models/registers.model.js");
const bcrypt = require("bcrypt");

class userService {
  registerUser = (user, callback) => {
    userModel.registerUser(user, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  };

  signInUser = (signInInfo, callback) => {
    userModel.signInUser(signInInfo, (error, data) => {
      if (data) {
        //const check = signInInfo.password == data.password;
        const check = bcrypt.compare(signInInfo.pasword, data.pasword);
        if (check == false) {
          return callback("invalid Password", null);
        } else {
          return callback(null, data);
        }
      } else {
        return callback("Please check your email and password !!");
      }
    });
  };
}

module.exports = new userService();
