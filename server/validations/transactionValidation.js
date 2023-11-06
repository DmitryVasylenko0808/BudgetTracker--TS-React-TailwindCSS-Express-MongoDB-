const { body } = require("express-validator");

const transactionValidation = [
    body("description", "Description is required").trim().notEmpty(),
    body("category", "Category is required").trim().notEmpty(),
    body("type", "Type is required").trim().notEmpty(),
    body("type").custom(value => {
        const types = ["Income", "Outcome"];
        if (!types.includes(value)) {
            throw new Error("Invalid type");
        }

        return true;
    }),
    body("sum", "Sum must be 0 or higher").isFloat({ min: 0.00 })
];

module.exports = { transactionValidation };