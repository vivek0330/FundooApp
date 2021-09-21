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

  token = (data, callback) => {
    jwt.sign(
      {
        username: data.firstName,
        lastname: data.lastName,
        password: data.password,
      },
      process.env.SECRET_KEY,
      (err, token) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, token);
        }
      }
    );
  };
}
module.exports = new Helper();
