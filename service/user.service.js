const userModel = require("../models/registers.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utility = require("../utility/hash&token.js");

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

  // user sign in
  signInUser = (signInInfo, callback) => {
    userModel.signInUser(signInInfo, (error, data) => {
      if (data) {
        //const check = signInInfo.password == data.password;
        const check = bcrypt.compare(signInInfo.pasword, data.pasword);

        if (check == false) {
          return callback("invalid Password", null);
        } else {
          utility.token(signInInfo, (error, token) => {
            if (error) {
              throw error;
            } else {
              return callback(null, token);
            }
          });
          // return callback(null, data);
          // const token = jwt.sign(
          //   {
          //     id: data._id,
          //     username: data.firstName,
          //     lastname: data.lastName,
          //   },
          //   process.env.SECRET_KEY
          // );
          // return callback(null, token);
        }
      } else {
        return callback("Please check your email and password !!");
      }
    });
  };
}

module.exports = new userService();
