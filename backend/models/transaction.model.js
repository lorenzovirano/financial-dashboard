const mongoose = require('mongoose');
const { Schema } = mongoose;
const user = require('./user.model')

const transactionSchema = new Schema ({
    type: {
        type: mongoose.Types.ObjectId, ref: "types",
    },
    category: {
        type: mongoose.Types.ObjectId, ref: "categories",
    },
    description: {
        type: String,
        required: true,
    },
    cash: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId, ref: "users",
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;