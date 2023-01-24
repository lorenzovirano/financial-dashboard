const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken")
const transactions = require("../models/transaction.model");
const Transaction = require("../models/transaction.model");

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

async function getUser(req, callback){
    const authHeader = req.headers.authorization;
    jwt.verify(authHeader, "ProvaKey", (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user.data;
    });
    let id = req.user
    const user = await Transaction.find({ id_user: id}).populate("transactions")
    if(user != null){
        return callback(null, user)
    }else{
        return callback("Invalid")
    }

}

module.exports = {
    login,
    register,
    getUser
}