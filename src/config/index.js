'strict';

const dotenv = require('dotenv');

dotenv.config();

/**
 * Returns api config object
 */
const config = {
	production: {
		PORT: process.env.PORT,
		MONGODB_URI: process.env.MONGODB_URI,
	},
	development: {
		PORT: process.env.PORT || 4000,
		MONGODB_URI: 'mongodb://localhost:27017/solution_hub_dev',
	},
	test: {
		PORT: 9000,
		MONGODB_URI: 'mongodb://localhost:27017/solution_hub_test',
	},
};

// export config for the current environment
module.exports = config[process.env.NODE_ENV] || config['production'];
