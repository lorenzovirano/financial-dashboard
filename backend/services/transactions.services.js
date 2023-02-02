const Transaction = require("../models/transaction.model");
const jwt = require('jsonwebtoken')
const csv = require("csvtojson");
const auth = require("../middlewares/auth")
const jwtUtil = require("jsonwebtoken")
const User = require("../models/user.model");
const Type = require("../models/type.model")
const Category = require("../models/category.model")

async function importCSV (req, callback){
    const authHeader = req.headers.authorization;
    const token = authHeader;
    jwt.verify(token, "ProvaKey", (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user.data;
    });
    const id = req.user
    const user = await User.find({ id })
        const transactionArray = await csv().fromString(req.file.buffer.toString());
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
                    user: id
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

async function getTypes(req, callback){
    const types = await Type.find();
    if(types != null){
        return callback(null, types);
    }else{
        return callback({
            message: "No types found"
        })
    }
}

async function getCategories(req, callback){
    const categories = await Category.find({ type: req.query.id })
    if(categories != null){
        return callback(null, categories);
    }else{
        return callback({
            message: "No categories found"
        })
    }
}


async function create (req, callback){
    const authHeader = req.headers.authorization;
    const token = authHeader;
    jwt.verify(token, "ProvaKey", (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user.data;
    });
    const id = req.user
    const transaction = await new Transaction({
        type: req.body.type,
        category: req.body.category,
        description: req.body.description,
        date: req.body.date,
        user: req.body.id
    }).save()
    .then((response) => {
        return callback(null, transaction)
    })
    .catch((error) => {
        return callback(error);
    })
}

async function update(req, callback){
    const authHeader = req.headers.authorization;
    const token = authHeader;
    jwt.verify(token, "ProvaKey", (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user.data;
    });
    const transaction = new Transaction.findById(req.body.id)
    if(transaction != null){
        Transaction.updateOne(transaction, {
            type: req.body.type,
            category: req.body.category,
            cash: req.body.cash,
            user: req.user,
            date: req.body.date,
            description: req.body.description
        })
    }
}


async function show (req, callback){
    const authHeader = req.headers.authorization;
    const token = authHeader;
    jwt.verify(token, "ProvaKey", (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user.data;
    });
    const transaction = new Transaction.findById(req.body.id)
    if(transaction != null){
        return callback(null, transaction)
    }else{
        return callback(error)
    }
}
module.exports = {
    importCSV,
    create,
    show,
    update,
    getCategories,
    getTypes
}