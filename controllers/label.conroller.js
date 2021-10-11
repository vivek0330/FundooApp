const labelServices = require("../service/label.services");
const logger = require("../logger/logger");

class Label {
    labelCreate = (req, res) => {
      try {
        const label = {
          labelName: req.body.labelName,
          userId: req.userData.dataForToken.id
        };
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
}

module.exports = new Label();
