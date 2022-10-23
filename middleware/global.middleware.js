const status = require('../routes/v1/health')
const cors = require('cors')
const express = require('express')
const middleware = [
    status,
    cors(),
    express.json()
]

module.exports = middleware