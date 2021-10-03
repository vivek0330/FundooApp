/* eslint-disable comma-dangle */
/**
 * @description   : It is use to establish the connection between the database and server and also start server
 * @package       : express.js
 * @file          : server.js
 * @author        : Vivek Varshney
 */

require("dotenv").config();

// importing express and body-parser modules.
const express = require("express");
const PORT = process.env.PORT;
const swagger = require("swagger-ui-express");
const swaggerJson = require("./swagger/swagger.json");
const logger = require("./logger/logger");

const option = {
  explorer: true,
};

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

app.use("/api-docs", swagger.serve, swagger.setup(swaggerJson, option));

// importing from database configuration to server.js and connecting to the database using mongoose.
// configuring the database
const dbConfig = require("./config/database.config.js");
dbConfig.database();

// define a simple route
app.get("/", (req, res) => {
  res.json({ Welcome: "Welcome to the Fundoo Notes App !" });
});

// ........

// Require Notes routes
require("./routes/user.route.js")(app);

// ........

// listen on port 8080 for incoming connects
// listen for requests
app.listen(PORT, () => {
  // console.log(`Server is running at port no ${PORT}`);
  logger.info(`Server is listing on port: ${PORT}`);
});

module.exports = app;
