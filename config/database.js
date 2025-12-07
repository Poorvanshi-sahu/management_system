const mongoose = require("mongoose");
const config = require("../config/config")

const connectDatabase = async () => {
    try {
        let con = await mongoose.connect(config.mongo.uri);
        console.log(`database connected ${con.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connectDatabase };