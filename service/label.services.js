const labelModel = require("../models/label.model");

class Service {
    labelCreate = (label, resolve, reject) => {
      labelModel.labelCreate(label)
        .then((data) => resolve(data))
        .catch(() => reject());
    }
}

module.exports = new Service();
