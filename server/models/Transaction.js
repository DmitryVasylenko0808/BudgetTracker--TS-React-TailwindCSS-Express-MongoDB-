const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        requires: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    type: {
        type: String,
        enum: ["Income", "Outcome"],
        required: true
    },
    sum: {
        type: Number,
        required: true,
        min: 0.00
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

module.exports = TransactionModel;