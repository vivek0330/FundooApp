/* eslint-disable comma-dangle */
// module.exports = {
//   url: "mongodb://localhost:27017/fundooNotes",
// };

const mongoose = require("mongoose");
const url = process.env.URL;
const logger = require("../logger/logger");

class DbConnection {
  database = () => {
    // mongoose connect method help us to connect with DB
    mongoose
      .connect(url, {
        useNewUrlParser: true,
      })
      .then(() => {
        logger.info("sucessfully connected to the database");
        console.log("sucessfully connected to the database");
      })
      .catch((err) => {
        logger.error("Could not connect to the database. Exiting now..", err);
        console.log("Could not connect to the database. Exiting now..", err);
        process.exit();
      });
  };
}
module.exports = new DbConnection();
