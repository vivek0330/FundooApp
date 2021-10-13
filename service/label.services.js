const labelModel = require("../models/label.model");
const logger = require("../logger/logger");

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

     updateLabelById = (updateLabel, callback) => {
       labelModel.updateLabelById(updateLabel, (error, data) => {
         if (error) {
           logger.error(error);
           return callback(error, null);
         } else {
           return callback(null, data);
         }
       }
       );
     }

     labelDeleteById = async (id) => {
       try {
         return await labelModel.labelDeleteById(id);
       } catch (err) {
         return err;
       }
     }

     async addNoteId (id) {
       try {
         return await labelModel.addNoteId(id);
       } catch (err) {
         return err;
       }
     }
}

module.exports = new Service();
