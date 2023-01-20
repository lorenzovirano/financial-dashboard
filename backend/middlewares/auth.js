const jwt = require('jsonwebtoken')
const User = require("../models/user.model");

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



function generateAccessToken(id){
    console.log(id)
    return jwt.sign({data: id}, "ProvaKey", {
        expiresIn: "1h"
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}