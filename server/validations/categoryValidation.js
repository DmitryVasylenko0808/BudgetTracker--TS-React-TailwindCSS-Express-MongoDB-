const { body } = require("express-validator");

const categoryValidation = [
    body("title", "Title is required").trim().notEmpty()
];

module.exports = { categoryValidation };