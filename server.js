require('dotenv').config()
// We import express.
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

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

// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});
