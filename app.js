const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { connectDatabase } = require("./config/database");
const task = require("./routes/tasksRoutes");
const errorHandler = require("./middlewares/errorHandler");
const config = require("./config/config")

app.use(express.json());

app.use("/api/v1/task", task);

app.use(errorHandler);

const start = async () => {
    try {
        await connectDatabase();

        app.listen(config.mongo.port, () => {
            console.log(`Listening on port 3000`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();