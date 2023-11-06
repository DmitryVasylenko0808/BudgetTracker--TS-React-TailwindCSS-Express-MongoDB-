const { body } = require("express-validator");
const UserModel = require("../models/User");

const signUpValidation = [
    body("login", "Login is required").trim().notEmpty(),
    body("login", "Login must have more than 2 characters").trim().isLength({ min: 3 }),
    body("password", "Password is required").trim().notEmpty(),
    body("password", "Password must have more than 7 characters").trim().isLength({ min: 8 }),
    body("password_confirm").custom(async (value, { req }) => {
        if (req.body.password !== value) {
            throw new Error("Passwords don't match");
        }

        return true;
    })
];

const signInValidation = [
    body("login", "Login is required").trim().notEmpty(),
    body("password", "Password is required").trim().notEmpty(),
]

module.exports = { 
    signUpValidation,
    signInValidation
}