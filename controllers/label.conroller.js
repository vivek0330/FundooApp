const labelServices = require("../service/label.services");
const validate = require("../middleware/joiValidation");
const logger = require("../logger/logger");
const redisjs = require("../middleware/redis");

class Label {
    labelCreate = (req, res) => {
      try {
        const label = {
          labelName: req.body.labelName,
          userId: req.userData.dataForToken.id
        };
        const valid = validate.validateLabel.validate(req.body);
        if (valid.error) {
          logger.error("Invalid label body");
          return res.status(400).send({
            message: "Please enter valid label",
            success: false,
            error: valid.error
          });
        }
        labelServices.labelCreate(label, resolve, reject);
        function resolve (data) {
          logger.info("Label inserted");
          res.status(201).send({
            message: "Label 🔖 created successfully ✔ ",
            success: true,
            data: data
          });
        }
        function reject () {
          logger.error("Label 🔖 not created ❌");
          res.status(500).send({
            message: "Label not created",
            success: false
          });
        }
      } catch {
        logger.error("Label 🔖 not created ❌ error occured ⚠");
        return res.status(500).send({
          message: "Error occured",
          success: false
        });
      }
    }

    labelGetAll = (req, res) => {
      const id = req.userData.dataForToken.id;
      labelServices.labelGetAll(id, (resolve, reject) => {
        if (resolve.length > 0) {
          logger.info("Found all labels 🔖");
          redisjs.setData("getLabel", 60, JSON.stringify(resolve));
          res.status(200).send({
            message: "labels 🔖 retrieved ✔",
            success: true,
            data: resolve
          });
        } else {
          logger.error("Label 🔖 Not ❌ found");
          res.status(404).send({
            message: "Labels 🔖 not ❌ found ",
            success: false
          });
        }
      });
    }

    labelGetById = async (req, res) => {
      try {
        const id = { userId: req.userData.dataForToken.id, noteId: req.params.id };
        // console.log(`Test: ${req.userData.dataForToken.id} and ${req.params.id}`);
        const data = await labelServices.labelGetById(id);
        // console.log(data);
        if (data.message) {
          return res.status(404).json({
            message: "label not found",
            success: false
          });
        }
        redisjs.setData("getLabelById", 60, JSON.stringify(data));
        return res.status(201).json({
          message: "label retrieved succesfully",
          success: true,
          data: data
        });
      } catch (err) {
        return res.status(500).json({
          message: "server error",
          success: false,
          data: err
        });
      }
    }

    updateLabelById =(req, res) => {
      try {
        const updateLabel = {
          id: req.params.id,
          userId: req.userData.dataForToken.id,
          labelName: req.body.labelName
        };
        console.log(updateLabel);
        const valid = validate.validateLabel.validate(req.body);
        if (valid.error) {
          logger.error("Invalid label body");
          return res.status(400).send({
            message: "Please enter valid label",
            success: false,
            error: valid.error
          });
        }
        labelServices.updateLabelById(updateLabel, (error, data) => {
          if (error) {
            logger.error("failed to update note");
            return res.status(400).json({
              message: "failed to update note",
              success: false
            });
          } else {
            logger.info("Successfully Update note");
            return res.status(201).send({
              message: "Successfully update label",
              success: true,
              data: data
            });
          }
        });
      } catch {
        logger.error("Internal server error");
        return res.status(500).json({
          message: "Error occured",
          success: false
        });
      }
    }

    labelDeleteById = async (req, res) => {
      try {
        const id = { userId: req.userData.dataForToken.id, noteId: req.params.id };
        const data = await labelServices.labelDeleteById(id);
        console.log(data);
        if (!data) {
          return res.status(404).json({
            message: "label not found",
            success: false
          });
        }
        return res.status(200).json({
          message: "label Delete succesfully",
          success: true
        });
      } catch (err) {
        return res.status(500).json({
          message: "label not Delete",
          success: false,
          data: err
        });
      }
    }

     addNoteId = async (id, res) => {
       try {
         await labelServices.addNoteId(id);
         return;
       } catch (err) {
         return err;
       }
     }
}

module.exports = new Label();
