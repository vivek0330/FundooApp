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

   validateToken = (req, res, next) => {
     const header = req.headers.authorization;
     const myArr = header.split(" ");
     const token = myArr[1];
     try {
       if (token) {
         jwt.verify(token, process.env.SECRET_KEY, (error, decodedToken) => {
           if (error) {
             return res.status(400).send({ success: false, message: "Invalid Token" });
           } else {
             req.user = decodedToken;
             next();
           }
         });
       } else {
         return res.status(401).send({ success: false, message: "Authorisation failed! Invalid user" });
       }
     } catch (error) {
       return res.status(500).send({ success: false, message: "Something went wrong!" });
     }
   }
}
module.exports = new Helper();
