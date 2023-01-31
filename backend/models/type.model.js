const mongoose = require('mongoose');
const { Schema } = mongoose;

const typeSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
});

const Type = mongoose.model("type", typeSchema);
module.exports = Type;