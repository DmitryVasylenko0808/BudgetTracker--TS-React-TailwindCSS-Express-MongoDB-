const express = require("express");
const isAuthorized = require("../middlewares/isAuthorized");
const StatisticContorller = require("../controllers/StatisticController");

const router = express.Router();

router.get("/evolution/:type/:periodType/:category", isAuthorized, StatisticContorller.getEvolution);

module.exports = router;