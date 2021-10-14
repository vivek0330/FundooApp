/*****************************************************************************
 * @description   : It is use to route the APIs
 * @file          : user.route.js
 * @author        : Vivek Varshney
 *****************************************************************************/

const userController = require("../controllers/user.controller.js");
const middleware = require("../middleware/hash&token");
const noteController = require("../controllers/note.controller");
const labelController = require("../controllers/label.conroller");
const redis = require("../middleware/redis");

module.exports = (app) => {
  app.post("/register", userController.registration);
  app.post("/signin", userController.signIn);
  app.post("/forgotPassword", userController.forgotPassword);

  // reset user password
  app.put("/reset-Password", middleware.validateToken, userController.resetPassword);

  // notes creation api - POST request
  app.post("/createnotes", middleware.validateToken, noteController.createNote);

  // get note api
  app.get("/getnotes", middleware.validateToken, redis.redis_port, noteController.getNote);

  // get not by id
  app.get("/getnotes/:id", middleware.validateToken, redis.redis_NOteById, noteController.getNoteById);

  // update data through id
  app.put("/updatenotes/:id", middleware.validateToken, noteController.updateNoteById);

  // delete data by id
  app.delete("/deletenotes/:id", middleware.validateToken, noteController.deleteNoteById);

  // label creation api - Post request
  app.post("/labelCreate", middleware.validateToken, labelController.labelCreate);

  // get all labels api - Get request
  app.get("/labelGet/all", middleware.validateToken, redis.redis_Label, labelController.labelGetAll);

  // get single label by ID api - GET request
  app.get("/labelGet/:id", middleware.validateToken, labelController.labelGetById);

  // update single label by ID api - PUT request
  app.put("/labelUpdate/:id", middleware.validateToken, labelController.updateLabelById);

  // delete label by ID api - DELETE request
  app.delete("/labelDelete/:id", middleware.validateToken, labelController.labelDeleteById);

  app.post("/addlabel/:id", middleware.validateToken, noteController.addLabelById);

  app.delete("/deleteLabelFromNote/:id", middleware.validateToken, noteController.deleteLabel);
};
