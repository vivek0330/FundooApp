/*****************************************************************************
 * @description   : It is use to route the APIs
 * @file          : user.route.js
 * @author        : Vivek Varshney
 *****************************************************************************/

const userController = require("../controllers/user.controller.js");
const middleware = require("../middleware/hash&token");
const noteController = require("../controllers/note.controller");

module.exports = (app) => {
  // Create a new Note
  app.post("/register", userController.registration);
  app.post("/signin", userController.signIn);
  app.post("/forgotPassword", userController.forgotPassword);
  app.put("/reset-Password", middleware.validateToken, userController.resetPassword);
  app.post("/createnotes", middleware.validateToken, noteController.createNote);
};
