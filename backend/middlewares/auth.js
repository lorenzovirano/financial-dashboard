const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next){
    const authHeader = req.headers.authorization;
    const token = authHeader;

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, "ProvaKey", (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

function generateAccessToken(username){
    return jwt.sign({data: username}, "ProvaKey", {
        expiresIn: "1h"
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}