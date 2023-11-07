const CategoryModel = require("../models/Category");
const TransactionModel = require("../models/Transaction");
const calculateEvolution = require("../utils/calculateEvolution");

class TransactionController {
    static async get(req, res) {
        try {
            const { year, month, limit, skip, type, category } = req.params;

            const fromDate = `${year}-${month}-01`;
            const toDate = `${year}-${month}-31`;
            const filter = {
                user: req.userId,
                date: {
                    $gte: fromDate,
                    $lte: toDate
                }
            }

            if (type !== "all") {
                const types = ["Income", "Outcome"];
                if (!types.includes(type)) {
                    return res.status(400).json({ message: "Invalid type" });
                }

                filter.type = type;
            }

            if (category !== "all") {
                const categoryFind = await CategoryModel.findOne({ title: category, user: req.userId });
                if (!categoryFind) {
                    return res.status(400).json({ message: "Invalid category" });
                }
                filter.category = categoryFind._id;
            }

            const transactions = await TransactionModel.find(filter, "-user")
                .skip(limit * skip)
                .limit(limit)
                .populate("category", "title"); 

            if (!transactions) {
                return res.status(404).json({ message: "Transactions are not found" });
            }

            res.json(transactions);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }

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

    static async seacrh(req, res) {
        try {
            const pattern = new RegExp(`.*${req.params.text}.*`);

            const transactions = await TransactionModel.find({ 
                description: { $regex: pattern, $options: "i" },
                user: req.userId
            });
            
            if (!transactions.length) {
                return res.status(404).json({ message: "Transaction is not found" });
            }

            res.json(transactions);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }

    static async add(req, res) {
        try {
            const category = await CategoryModel.findOne({ title: req.body.category });
            if (!category) {
                return res.status(400).json({
                    path: "category",
                    message: "Invalid category"
                });
            }

            let doc;
            if (req.body.date) {
                doc = new TransactionModel({
                    date: new Date(req.body.date),
                    description: req.body.description,
                    category: category._id,
                    type: req.body.type,
                    sum: req.body.sum,
                    user: req.userId
                });
            } else {
                doc = new TransactionModel({
                    description: req.body.description,
                    category: category._id,
                    type: req.body.type,
                    sum: req.body.sum,
                    user: req.userId
                });
            }
            await doc.save();

            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }

    static async edit(req, res) {
        try {
            const category = await CategoryModel.findOne({ title: req.body.category, user: req.userId });
            if (!category) {
                return res.status(400).json({
                    path: "category",
                    message: "Invalid category"
                });
            }

            const transaction = await TransactionModel.findByIdAndUpdate(
                req.params.id,
                {
                    date: req.body.date,
                    description: req.body.description,
                    category: category._id,
                    type: req.body.type,
                    sum: req.body.sum,
                }
            );

            if (!transaction) {
                return res.status(404).json({
                    path: "",
                    message: "Transaction is not found"
                });
            }

            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }

    static async delete(req, res) {
        try {
            const { ids } = req.body;

            await TransactionModel.deleteMany({ 
                _id: { 
                    $in: ids 
                },
                user: req.userId 
            });

            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }
}

module.exports = TransactionController;