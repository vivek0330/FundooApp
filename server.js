// We import express.
const express = require("express");

// create express app
const app = express();

const port = process.env.PORT || 8080;

// configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Fundoo Notes App !");
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});
