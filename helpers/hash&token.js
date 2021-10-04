/* eslint-disable node/no-callback-literal */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        throw err;
      } else {
        return callback(null, hash);
      }
    });
  };

  token = (data) => {
    const dataForToken = {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };
    return jwt.sign({ dataForToken }, process.env.SECRET_KEY, { expiresIn: "1H" });
  }

  getEmailFromToken (token, callback) {
    jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }
}
module.exports = new Helper();
