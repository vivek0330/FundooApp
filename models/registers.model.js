const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// /**
//  * @description     : It is converting password content to a encrypted to form using pre middleware
//  *                    of mongoose and bcrypt npm package.
//  * @middleware      : pre is the middleware of mongoose schema
//  * @package         : bcrypt is used to encrpt the password we are getting from client side
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    //console.log(hashedPassword);
    this.password = hashedPassword;
    //console.log(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

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
    Register.findOne({ firstName: userDetails.firstName }, (error, data) => {
      if (data) {
        return callback("User already exits", null);
      } else {
        newUser.save();
        return callback(null, newUser);
      }
    });
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
