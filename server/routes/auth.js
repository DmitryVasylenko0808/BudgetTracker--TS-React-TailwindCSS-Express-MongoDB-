const express = require("express");
const AuthController = require("../controllers/AuthController");
const { signUpValidation, signInValidation } = require("../validations/userValidation");
const handleValidationErrors = require("../middlewares/handleValidationErrors");
const isAuthorized = require("../middlewares/isAuthorized");

const router = express.Router();

router.get("/me", isAuthorized, AuthController.getMe);
router.post("/signup", signUpValidation, handleValidationErrors, AuthController.signUp);
router.post("/signin", signInValidation, handleValidationErrors, AuthController.signIn);

module.exports = router;