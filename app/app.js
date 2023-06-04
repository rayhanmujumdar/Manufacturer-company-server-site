require("dotenv").config();
const express = require("express");
const dbClient = require("../db/db");
const status = require("../routes/v1/health");
const app = express();
const globalMiddleware = require("../middleware/global.middleware");
const { notFoundHandler, errorHandler } = require("../errors/error.route");

//database connect
async function databaseConnection() {
  try {
    await dbClient.connect();
    console.log("database connect");
  } catch (err) {
    console.log(err)
  }
}
databaseConnection();

// all middleware
app.use(globalMiddleware);

// route middleware
app.use(status);

// route errors
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
