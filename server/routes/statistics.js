const express = require("express");
const isAuthorized = require("../middlewares/isAuthorized");
const StatisticContorller = require("../controllers/StatisticController");

const router = express.Router();

router.get("/evolution/:type/:periodType/:category", isAuthorized, StatisticContorller.getEvolution);
router.get("/reports/:year/:type", isAuthorized, StatisticContorller.getReports);

module.exports = router;