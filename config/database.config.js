// module.exports = {
//   url: "mongodb://localhost:27017/fundooNotes",
// };


const mongoose = require('mongoose')
const url = process.env.URL;

class dbConnection {
  database = () => {
    mongoose.Promise = global.Promise;
    //mongoose connect method help us to connect with DB
    mongoose.connect(url, {
      useNewUrlParser: true,
    }).then(() => {
      console.log("sucessfully connected to the database");
    }).catch(err => {
      console.log("Could not connect to the database. Exiting now..", err);
      process.exit();
    });
  }
}
module.exports = new dbConnection();