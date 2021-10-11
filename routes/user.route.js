/*****************************************************************************
 * @description   : It is use to route the APIs
 * @file          : user.route.js
 * @author        : Vivek Varshney
 *****************************************************************************/

const userController = require("../controllers/user.controller.js");
const middleware = require("../middleware/hash&token");
const noteController = require("../controllers/note.controller");
const labelController = require("../controllers/label.conroller");

module.exports = (app) => {
  app.post("/register", userController.registration);
  app.post("/signin", userController.signIn);
  app.post("/forgotPassword", userController.forgotPassword);

  // reset user password
  app.put("/reset-Password", middleware.validateToken, userController.resetPassword);

  // notes creation api - POST request
  app.post("/createnotes", middleware.validateToken, noteController.createNote);

  // get note api
  app.get("/getnotes", middleware.validateToken, noteController.getNote);

  // get not by id
  app.get("/getnotes/:id", middleware.validateToken, noteController.getNoteById);

  // update data through id
  app.put("/updatenotes/:id", middleware.validateToken, noteController.updateNoteById);

  // delete data by id
  app.delete("/deletenotes/:id", middleware.validateToken, noteController.deleteNoteById);

  // label creation api - Post request
  app.post("/labelCreate", middleware.validateToken, labelController.labelCreate);

  // get all labels api - Get request
  app.get("/labelGet/all", middleware.validateToken, labelController.labelGetAll);
};
