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
        email: data.email
      },
      process.env.SECRET_KEY,
      (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      }
    );
  };
}
module.exports = new Helper();
