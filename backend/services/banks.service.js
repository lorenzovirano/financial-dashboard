const Bank = require("../models/bank.model");
const jwt = require('jsonwebtoken');

async function insertBanks (req, callback) {
    const authHeader = req.headers.authorization;
    const token = authHeader;
    jwt.verify(token, "ProvaKey", (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user.data;
    });
    const id = req.user;
    const bank = await new Bank({
            bankName: req.body.bankName,
            user: id
    }).save()
    .then((response) => {
        return callback(null, response)
    })
    .catch((error) => {
        return callback(error);
    })
}

module.exports = {
    insertBanks
}