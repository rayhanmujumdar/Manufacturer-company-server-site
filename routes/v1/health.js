const status = require('express').Router()
const routerTools = require('./tools.route')
/**
 * @api {get}
 * @apiDescription check and test api route
 * @apiPermission All people get in api
 * 
 * @apiSuccess success
 * @apiError No custom error send
*/
status.get('/health',(_req,res) => {
    res.status(200).json({
        message: "success"
    })
})

status.use('/api/v1/tools',routerTools)

module.exports = status