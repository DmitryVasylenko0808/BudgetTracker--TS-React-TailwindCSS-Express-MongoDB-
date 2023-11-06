const express = require("express");
const cors = require("cors");
const config = require("./config");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

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