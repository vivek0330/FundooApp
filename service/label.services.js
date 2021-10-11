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

     labelGetById = async (id) => {
       try {
         return await labelModel.labelGetById(id);
       } catch (err) {
         return err;
       }
     }

     labelDeleteById = async (id) => {
       try {
         return await labelModel.labelDeleteById(id);
       } catch (err) {
         return err;
       }
     }
}

module.exports = new Service();
