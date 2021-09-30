/*****************************************************************************
 * @description   : It is use to route the APIs
 * @file          : user.route.js
 * @author        : Vivek Varshney
 *****************************************************************************/

const userController = require("../controllers/user.controller.js");

module.exports = (app) => {
  // Create a new Note
  app.post("/register", userController.registration);
  app.post("/signin", userController.signIn);
  app.put("/forgotPassword", userController.forgotPassword);
};
