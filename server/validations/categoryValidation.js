const { body } = require("express-validator");

const categoryValidation = [
    body("title", "Title is required").trim().notEmpty(),
    body("type").custom(value => {
        const types = ["Income", "Outcome"];
        if (!types.includes(value)) {
            throw new Error("Invalid type");
        }

        return true;
    })
];

module.exports = { categoryValidation };