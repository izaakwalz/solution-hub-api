const express = require('express');
const http = require('http');
const config = require('./config');
const ErrorMiddlewares = require('./middlewares/error.middleware');

const app = express();

// Middlewares used by express app
require('./middlewares/app.middleware')(app);

// Default route
app.get('/', (req, res) => {
    res.send('API IS RUNNING  🚨 🚨 🚨 🚨');
});

// Error middlewares
ErrorMiddlewares(app);

const server = http.createServer(app);

server.listen(config.PORT, async () => {
    await require('./config/mongo-db-config')(); // database connection
    console.log(`:> Server running in ${process.env.NODE_ENV} mode on port :> ${config.PORT}`);
});

server.on('error', (error) => {
    console.error(`< An error occurred on the server: \n ${error}`);
});
