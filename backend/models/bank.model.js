const mongoose = require('mongoose');
const { Schema } = mongoose;
const user = require('./user.model')

const bankSchema = new Schema ({
    bankName: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Types.ObjectId, 
        ref: "users",
    }

});

const Bank = mongoose.model("bank", bankSchema);
module.exports = Bank;