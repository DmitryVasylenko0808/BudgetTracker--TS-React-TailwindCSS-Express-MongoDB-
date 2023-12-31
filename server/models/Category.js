const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Income", "Outcome"],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;