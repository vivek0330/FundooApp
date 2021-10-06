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
    return jwt.sign({ dataForToken }, process.env.SECRET_KEY);
  };

  getEmailFromToken = (token) => {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      return data;
    } else {
      return "couldnt verify";
    }
  }

  validateToken = (req, res, next) => {
    try {
      const header = req.headers.authorization;
      const myArr = header.split(" ");
      const token = myArr[1];
      const verify = jwt.verify(token, process.env.SECRET_KEY);
      if (verify) {
        console.log("seccess");
        next();
      } else {
        return res.status(400).send({
          message: "Invalid Token",
          success: false
        });
      }
    } catch {
      return res.status(401).send({
        message: "Invalid Token",
        success: false
      });
    }
  }
}
module.exports = new Helper();
