const jtw = require('jsonwebtoken')
const confg = require('../config')

function verifyToken(req,res,next){
        //cabeceras: x-access-token
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(401).json({
                auth: false,
                message: 'No token provided'
            })
        }
        const decoed = jtw.verify(token, confg.secret)
        console.log(decoed)
        req.userId = decoed.id
        next()
}

module.exports = verifyToken