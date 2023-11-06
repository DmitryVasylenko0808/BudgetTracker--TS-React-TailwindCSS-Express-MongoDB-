const express = require("express");
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const categoriesRoutes = require("./routes/categories");
const transactionsRoutes = require("./routes/transactions");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/transactions", transactionsRoutes);

const main = async () => {
    try {
        await mongoose.connect(config.DB_URL);
        console.log("DB OK");
    
        app.listen(config.PORT, () => {
            console.log("SERVER OK");
        });
    } catch (err) {
        console.log(err);
    }
};

main();