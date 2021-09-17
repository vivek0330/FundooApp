const userService = require("../service/user.service.js");

class userController {
  registration = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      userService.registerUser(user, (error, data) => {
        if (error) {
          return res.status(409).json({
            success: false,
            message: "User already exits",
          });
        } else {
          return res.status(201).json({
            success: true,
            message: "User Registered successfully",
            data: data,
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while registering",
        data: null,
      });
    }
  };
  signIn = (req, res) => {
    try {
      const signInInfo = {
        email: req.body.email,
        password: req.body.password,
      };

      userService.signInUser(signInInfo, (error, data) => {
        if (error) {
          return res.status(403).json({
            success: false,
            message: "Incorrect email and password",
            error,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "User successfully logged In",
            data,
          });
        }
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Internal server error",
        data,
      });
    }
  };
}

module.exports = new userController();
