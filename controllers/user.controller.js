const userService = require("../service/user.service.js");
const utility = require("../helpers/joiValidation");

class userController {
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
        return res.status(400).send({
          success: false,
          message: "Wrong Input Validations",
          data: registerValidation,
        });
      }
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
          return res.status(403).json({
            success: false,
            message: "Incorrect email and password",
            error,
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "User successfully logged In",
            // data: data,
            token: data,
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
