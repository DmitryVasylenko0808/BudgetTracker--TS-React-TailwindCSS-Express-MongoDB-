const CategoryModel = require("../models/Category");
const TransactionModel = require("../models/Transaction");

class TransactionController {
    static async get(req, res) {
        try {
            const transactions = await TransactionModel.find(
                {
                    user: req.userId
                },
                "-user"
            );
            if (!transactions) {
                return res.status(404).json({ message: "Transactions are not found" });
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
                    date: req.body.date,
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
            const category = await CategoryModel.findOne({ title: req.body.category });
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
                } 
            });

            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }
}

module.exports = TransactionController;