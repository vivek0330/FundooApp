/* eslint-disable comma-dangle */
const userService = require("../service/user.service.js");
const utility = require("../helpers/joiValidation");
const logger = require("../logger/logger");

class UserController {
  registration = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      const registerValidation = utility.registraionAuth.validate(user);
      if (registerValidation.error) {
        console.log(registerValidation.error);
        logger.error("Wrong Validation");
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: registerValidation,
        });
      }
      userService.registerUser(user, (error, data) => {
        if (error) {
          logger.info("User Already Exit");
          return res.status(409).json({
            success: false,
            message: "User already exits",
          });
        } else {
          logger.info("USer Registered Successfully");
          return res.status(201).json({
            success: true,
            message: "User Registered successfully",
            data: data,
          });
        }
      });
    } catch (error) {
      logger.error("internal server error");
      return res.status(500).json({
        success: false,
        message: "Error while registering",
        data: null,
      });
    }
  };

  // sign in user

  signIn = (req, res) => {
    try {
      const signInInfo = {
        email: req.body.email,
        password: req.body.password,
      };

      // const loginValidation = utility.loginAuth.validate(signInInfo);
      // if (loginValidation.error) {
      //   return res.status(400).send({
      //     success: false,
      //     message: "Wrong Input Validations",
      //     data: loginValidation,
      //   });
      // }

      userService.signInUser(signInInfo, (error, data) => {
        if (error) {
          logger.error("Incorrect email and password");
          return res.status(403).json({
            success: false,
            message: "Incorrect email and password",
            error,
          });
        } else {
          logger.info("User successfully logged In");
          return res.status(200).json({
            success: true,
            message: "User successfully logged In",
            // data: data,
            token: data,
          });
        }
      });
    } catch (error) {
      logger.error("Internal server error");
      return res.status(500).send({
        success: false,
        message: "Internal server error",
        data: null,
      });
    }
  };
}

module.exports = new UserController();
