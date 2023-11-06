const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

class AuthController {
    static async getMe(req, res) {
        try {
            const user = await UserModel.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: "User is not found" });
            }

            const { password_hash, ...userData} = user._doc;

            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal error" })
        }
    }

    static async signUp(req, res) {
        try {
            const user = await UserModel.findOne({ login: req.body.login });
            if (user) {
                return res.status(400).json({ 
                    path: "login", 
                    message: "This login is already exists" 
                });
            }

            const { password } = req.body;
            const hash = await bcrypt.hash(password, 5);

            const doc = new UserModel({
                login: req.body.login,
                password_hash: hash
            });
            await doc.save();

            res.status(201).json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal error" })
        }
    }

    static async signIn(req, res) {
        try {
            const user = await UserModel.findOne({ login: req.body.login });
            if (!user) {
                return res.status(400).json({
                    path: "",
                    message: "Invalid login or password"
                })
            }

            const isValidPass = await bcrypt.compare(req.body.password, user.password_hash);
            if (!isValidPass) {
                return res.status(400).json({
                    path: "",
                    message: "Invalid login or password"
                })
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    userLogin: user.login
                },
                config.SECRET_KEY,
                {
                    expiresIn: "30d"
                }
            );

            res.json(token)
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal error" })
        }
    }
};

module.exports = AuthController;