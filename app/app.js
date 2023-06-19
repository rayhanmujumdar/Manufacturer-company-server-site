require("dotenv").config();
const express = require("express");
const dbClient = require("../db/db");
const routes = require("../routes/v1/index");
const app = express();
const globalMiddleware = require("../middleware/global.middleware");
const { notFoundHandler, errorHandler } = require("../errors/error.route");

//database connect
async function databaseConnection() {
  try {
    await dbClient.connect();
    console.log("database connect");
  } catch (err) {
    console.log(err);
  }
}
databaseConnection();

// all middleware
app.use(globalMiddleware);

// route middleware
app.use(routes);

// route errors
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
