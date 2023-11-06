const express = require("express");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const isAuthorized = require("../middlewares/isAuthorized");
const TransactionController = require("../controllers/TransactionsController");
const { transactionValidation } = require("../validations/transactionValidation");

const router = express.Router();

router.get("/", isAuthorized, TransactionController.get);
router.post("/", isAuthorized, transactionValidation, handleValidationErrors, TransactionController.add);
router.patch("/:id", isAuthorized, transactionValidation, handleValidationErrors, TransactionController.edit);
router.delete("/", isAuthorized, TransactionController.delete);

module.exports = router;