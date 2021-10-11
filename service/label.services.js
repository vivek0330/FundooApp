const labelModel = require("../models/label.model");

class Service {
    labelCreate = (label, resolve, reject) => {
      labelModel.labelCreate(label)
        .then((data) => resolve(data))
        .catch(() => reject());
    }

     labelGetAll =(id, callback) => {
       labelModel.labelGetAll(id)
         .then((data) => { callback(data, null); })
         .catch((err) => { callback(null, err); });
     }
}

module.exports = new Service();
