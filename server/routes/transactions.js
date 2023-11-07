const express = require("express");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const isAuthorized = require("../middlewares/isAuthorized");
const TransactionController = require("../controllers/TransactionsController");
const { transactionValidation } = require("../validations/transactionValidation");

const router = express.Router();

router.get("/:year/:month/:type/:category", isAuthorized, TransactionController.get);
router.get("/evolution/:type/:periodType/:category", isAuthorized, TransactionController.getEvolution);
router.get("/search/:text", isAuthorized, TransactionController.seacrh);
router.post("/", isAuthorized, transactionValidation, handleValidationErrors, TransactionController.add);
router.patch("/:id", isAuthorized, transactionValidation, handleValidationErrors, TransactionController.edit);
router.delete("/", isAuthorized, TransactionController.delete);

module.exports = router;