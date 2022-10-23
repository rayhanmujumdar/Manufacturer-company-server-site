require("dotenv").config();
const express = require("express");
const dbClient = require("../db/db");
const status = require('../routes/v1/health')
const app = express();
const globalMiddleware = require("../middleware/global.middleware");
const { notFoundHandler, errorHandler } = require("../errors/error.route");

//database connect
async function databaseConnection() {
  await dbClient.connect()
  console.log("database connect");
}
databaseConnection();

// all middleware
console.log(globalMiddleware)
app.use(globalMiddleware);

// route middleware
app.use(status)

// route errors
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
