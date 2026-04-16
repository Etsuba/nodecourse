const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req,res,next) =>{
    const authHeader  = req.headers['authorization']
     if(!authHeader) return res.sendStatus(401)
     console.log(authHeader) //bearertoken
    const token = authHeader.split(' ')[1] //how couild we know the token position
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403)//invalid token
            req.user = decoded.username //we pass the username to jwt
            next()
        }
    )
}


module.exports = verifyJWT