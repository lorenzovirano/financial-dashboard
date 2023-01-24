const Transaction = require("../models/transaction.model");
const jwt = require('jsonwebtoken')
const csv = require("csvtojson");
const auth = require("../middlewares/auth")
const jwtUtil = require("jsonwebtoken")
const User = require("../models/user.model");

async function importCSV (req, callback){
    const authHeader = req.headers.authorization;
    const token = authHeader;
    jwt.verify(token, "ProvaKey", (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user.data;
    });
    const id = req.user
    const user = await User.findOne({ id })
    console.log(user);
        const transactionArray = await csv().fromString(req.file.buffer.toString());
        console.log(transactionArray);
        if(transactionArray.length != 0){
            for(let i = 0; i < transactionArray.length; i++){
                const type = transactionArray[i].type;
                const description = transactionArray[i].description;
                const cash = transactionArray[i].cash;
                const date = transactionArray[i].date;
                await new Transaction({
                    type: type,
                    description: description,
                    cash: cash,
                    date: date,
                    id_user: user
                  }).save()
                  .then((response) => {
                    return callback(null, transactionArray);
                })
                .catch((error) => {
                    return callback(error);
                })
            }
        }
}

module.exports = {
    importCSV
}