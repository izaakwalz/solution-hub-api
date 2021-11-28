'strict';

const mongoose = require('mongoose');
const config = require('../config');

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const connectDB = async () => {
	try {
		const conn = mongoose.connect(config.MONGODB_URI, options);
		console.log(`:> Connected to MongoDB Database :> ${(await conn).connection.host} `);
	} catch (error) {
		console.log("<: Could'nt connect to database <:", error.message);
	}
};

module.exports = connectDB;
