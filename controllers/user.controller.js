/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
const userService = require("../service/user.service.js");
const utility = require("../middleware/joiValidation");
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
        logger.error("if getting a Wrong Validation");
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
    const userLoginInfo = {
      email: req.body.email,
      password: req.body.password
    };
    console.log("userLogininfo :: " + userLoginInfo);
    const loginValidation = utility.loginSchema.validate(userLoginInfo);
    if (loginValidation.error) {
      logger.error(loginValidation.error);
      res.status(422).send({
        success: false,
        message: loginValidation.error.message
      });
    }
    userService.userLogin(userLoginInfo, (error, data) => {
      if (error) {
        logger.error(error);
        return res.status(401).json({
          success: false,
          message: "Unable to login. Please enter correct info",
          error
        });
      }
      logger.info("User logged in successfully");
      return res.status(201).json({
        success: true,
        message: "User logged in successfully",
        token: data
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while Login",
      data: null
    });
  }
};

// forgot password
   forgotPassword=(req, res) => {
     try {
       const email = req.body;
       const loginValid = utility.authenticateLogin.validate(email);
       if (loginValid.error) {
         logger.error("Invalid email id");
         res.status(422).send({
           success: false,
           message: "Invalid email id"
         });
         return;
       }
       userService.forgotPassword(email, (error, data) => {
         if (error) {
           logger.error("Incorrect email for forgotten password");
           return res.status(400).send({ error });
         } else {
           logger.info("Email forgot password link sent succesfully");
           return res.status(200).json({
             success: true,
             message: "Email forgot password link sent succesfully"
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
   }

  // reset password
  resetPassword = (req, res) => {
    try {
      const inputData = {
        email: req.userData.dataForToken.email,
        password: req.body.password
      };
      const loginValidation = utility.resetSchema.validate(inputData);
      if (loginValidation.error) {
        logger.error("Invalid password");
        res.status(422).send({
          success: false,
          message: "Invalid password"
        });
        return;
      }

      userService.resetPassword(inputData, (error, userData) => {
        if (error) {
          logger.error("did not data from service to controller");
          return res.status(400).send({
            message: error,
            success: false
          });
        } else {
          logger.info("Password reset succesfully");
          return res.status(200).json({
            success: true,
            data: userData
          });
        }
      });
    } catch (error) {
      logger.error("Internal server error");
      return res.status(500).send({
        success: false,
        data: null
      });
    }
  };
}

module.exports = new UserController();
