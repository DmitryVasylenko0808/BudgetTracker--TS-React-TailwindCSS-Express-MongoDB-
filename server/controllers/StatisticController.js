const CategoryModel = require("../models/Category");
const TransactionModel = require("../models/Transaction");
const calculateEvolution = require("../utils/calculateEvolution");
const calculateReports = require("../utils/calculateReports");

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

    static async getReports(req, res) {
        try {
            const { year, type } = req.params;
    
            const fromDate = `${year}-01-01`;
            const toDate = `${year}-12-31`;
    
            const categories = await CategoryModel.find({ 
                user: req.userId, 
                type 
            });
            const transactions = await TransactionModel.find({ 
                user: req.userId,
                type,
                date: {
                    $gte: fromDate,
                    $lte: toDate
                } 
            });
    
            const result = calculateReports(categories, transactions);
    
            res.json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }
}

module.exports = StatisticContorller;