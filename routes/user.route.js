const userController = require("../controllers/user.controller.js");

module.exports = (app) => {
  // Create a new Note
  app.post("/register", userController.registration);
  app.post("/signin", userController.signIn);
};
