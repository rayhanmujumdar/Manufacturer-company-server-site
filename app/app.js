require('dotenv').config()
const express = require('express')
const app = express()
const globalMiddleware = require("../middleware/global.middleware");
const {notFoundHandler,errorHandler} = require('../errors/error.route')

// all middleware
app.use(globalMiddleware);

// route errors
app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app