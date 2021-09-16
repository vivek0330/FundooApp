const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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

/**
 * @description     : It is converting password content to a encrypted to form using pre middleware
 *                    of mongoose and bcrypt npm package.
 * @middleware      : pre is the middleware of mongoose schema
 * @package         : bcrypt is used to encrpt the password we are getting from client side
*/
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error)
  }
});

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
