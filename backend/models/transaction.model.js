const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema ({
    type: {
        type: String,
        required: true
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
    id_user: {
        type: String, 
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;