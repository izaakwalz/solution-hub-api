const mongoose = require('mongoose');
const config = require('../config');

const connectDB = async () => {
    try {
        const conn = mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`:> Connected to MongoDB Database :> ${(await conn).connection.host} `);
    } catch (error) {
        console.log("<: Could'nt connect to database <:", error.message);
    }
};

module.exports = connectDB;
