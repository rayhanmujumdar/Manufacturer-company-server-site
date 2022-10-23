require('dotenv').config()
// jwt verify token
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({
            massage: "Unauthorized"
        })
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: 'forbidden'
            })
        }
        req.decoded = decoded
        next()
    })
}