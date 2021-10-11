const labelServices = require("../service/label.services");
const validate = require("../middleware/joiValidation");
const logger = require("../logger/logger");

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
        console.log(`Test: ${req.userData.dataForToken.id} and ${req.params.id}`);
        const data = await labelServices.labelGetById(id);
        if (data.message) {
          return res.status(404).json({
            message: "label not found",
            success: false
          });
        }
        return res.status(200).json({
          message: "label retrieved succesfully",
          success: true,
          data: data
        });
      } catch (err) {
        return res.status(500).json({
          message: "label not updated",
          success: false,
          data: err
        });
      }
    }

    labelDeleteById = async (req, res) => {
      try {
        const id = { userId: req.userData.dataForToken.id, noteId: req.params.id };
        console.log(`Test: ${req.userData.dataForToken.id} and ${req.params.id}`);
        const data = await labelServices.labelDeleteById(id);
        console.log(data);
        if (data.message) {
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
}

module.exports = new Label();
