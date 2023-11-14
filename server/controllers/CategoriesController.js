const CategoryModel = require("../models/Category");
const formatTitleCategory = require("../utils/formatTitleCategory");

class CategoriesController {
    static async get(req, res) {
        try {
            const categories = await CategoryModel.find({ user: req.userId }, "title type");
            if (!categories) {
                return res.status(404).json({ message: "Categories are not found" })
            }

            res.json(categories);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }

    static async add(req, res) {
        try {
            const { title, type } = req.body;
            const formatTitle = formatTitleCategory(title);

            const category = await CategoryModel.findOne({ title: formatTitle, user: req.userId });
            if (category) {
                return res.status(400).json({
                    path: "title",
                    message: "This category is already exists"
                });
            }

            const doc = new CategoryModel({ 
                title: formatTitle,
                type,
                user: req.userId 
            });
            await doc.save();

            res.status(201).json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }

    static async rename(req, res) {
        try {
            const { title } = req.body;
            const formatTitle = formatTitleCategory(title);

            const category = await CategoryModel.findByIdAndUpdate(
                req.params.id,
                {
                    title: formatTitle,
                }
            );

            if (!category) {
                return res.status(404).json({ message: "The category is not found" });
            }

            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }

    static async delete(req, res) {
        try {
            const category = await CategoryModel.findByIdAndDelete(req.params.id);

            if (!category) {
                return res.status(404).json({ message: "The category is not found" });
            }
            
            res.json(true);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Error" });
        }
    }
};

module.exports = CategoriesController;