const { body } = require("express-validator");

const addCategoryValidation = [
    body("title", "Title is required").trim().notEmpty(),
    body("type").custom(value => {
        const types = ["Income", "Outcome"];
        if (!types.includes(value)) {
            throw new Error("Invalid type");
        }

        return true;
    })
];

const renameCategoryValidation = [
    body("title", "Title is required").trim().notEmpty()
];

module.exports = { 
    addCategoryValidation, 
    renameCategoryValidation
};