const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const middleware = [
    cors(),
    express.json(),
    morgan('dev'),
    // express.urlencoded({extended: true})
]

module.exports = middleware