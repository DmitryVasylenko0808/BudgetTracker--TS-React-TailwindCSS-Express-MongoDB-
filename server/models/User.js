const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true
        },
        password_hash: {
            type: String,
            required: true
        },
        sum: {
            type: Number,
            default: 0.00
        }
    }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;