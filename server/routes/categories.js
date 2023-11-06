const express = require("express");
const isAuthorized = require("../middlewares/isAuthorized");
const CategoriesController = require("../controllers/CategoriesController");
const { categoryValidation } = require("../validations/categoryValidation");
const handleValidationErrors = require("../middlewares/handleValidationErrors");

const router = express.Router();

router.get("/", isAuthorized, CategoriesController.get);
router.post("/", isAuthorized, categoryValidation, handleValidationErrors,  CategoriesController.add);
router.patch("/:id", isAuthorized, categoryValidation, handleValidationErrors,  CategoriesController.rename);
router.delete("/:id", isAuthorized, CategoriesController.delete);

module.exports = router;