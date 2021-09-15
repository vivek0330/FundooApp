module.exports = (app) => {
  const userController = require("../controllers/user.controller.js");

  // Create a new Note
  app.post("/register", userController.registration);
};
