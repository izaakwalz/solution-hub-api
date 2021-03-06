const dotenv = require('dotenv');

dotenv.config();

const config = {
    production: {
        PORT: process.env.PORT,
        MONGODB_URI: process.env.MONGODB_URI,
    },
    development: {
        PORT: process.env.PORT || 4000,
        MONGODB_URI: 'mongodb://localhost:27017/hub_dev',
    },
    test: {
        PORT: 9000,
        MONGODB_URI: 'mongodb://localhost:27017/hub_test',
    },
};

// export configuration for the current environment
module.exports = config[process.env.NODE_ENV] || config['production'];
