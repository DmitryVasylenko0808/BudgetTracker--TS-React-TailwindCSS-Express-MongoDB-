const TransactionModel = require("../models/Transaction");
const calculateEvolution = require("../utils/calculateEvolution");

class StatisticContorller {
    static async getEvolution(req, res) {
        try {
            const { type, periodType, category } = req.params;

            const transactions = await TransactionModel.find({ user: req.userId }).populate("category", "title");
            const result = calculateEvolution(transactions, type, periodType, category);

            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }
}

module.exports = StatisticContorller;