const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken")
const transactions = require("../models/transaction.model");
const Transaction = require("../models/transaction.model");
const Type = require("../models/type.model");
const { Types } = require("mongoose");

async function login({username, password}, callback){
    const user = await User.findOne({ username });
    if(user != null){
        if(bcrypt.compareSync(password, user.password)){
            const token = auth.generateAccessToken(user.id);
            return callback(null, {user, token});
        }else{
            return callback({
                message: "Invalid Username/Password"
            })
        }
    }else{
        return callback({
            message: "Invalid Username/Password"
        })
    }
}

async function register(params, callback){
    if(params.username === undefined){
        return callback({
            message: "Username required"
        });
    }

    const user = new User(params);
    user.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    })
}

async function getRevenue(id){
    let revenues = await Transaction.find({"cash": {$lt: 0}, user: id})
    let types = await Type.find()
    let resultLabel = new Array
    let resultCash = new Array
    types.forEach(type => {
        let flag = 0
        let wallet = 0.00

        revenues.forEach(revenue => {
            if(revenue.type == type.id){
                wallet += parseFloat(revenue.cash) * -1
                flag = 1
            }
        })
        if(flag == 1){
            resultLabel.push(type.name)
            resultCash.push(wallet)
        }
    })
    console.log({resultCash: resultCash, resultLabel: resultLabel})
    return {resultCash: resultCash, resultLabel: resultLabel}
}


async function getUser(req, callback){
    const authHeader = req.headers.authorization;
    jwt.verify(authHeader, "ProvaKey", (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user.data;
    });
    let id = req.user
    const user = await User.findById(id)
    const transactions = await Transaction.find({ user: id })
    let wallet = 0
    for await (const transaction of transactions){
        wallet += parseFloat(transaction.cash)
    }
    let revenues = getRevenue(id)
    
    wallet = wallet.toString()
    if(transactions != null){
        return callback(null, {transactions, user, wallet, revenues})
    }else{
        return callback("Invalid")
    }

}

module.exports = {
    login,
    register,
    getUser
}