const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    type: {
        type: mongoose.Types.ObjectId,
        ref: "types"
    }
});

const Category = mongoose.model("category", categorySchema);
module.exports = Category;