'strict';

const express = require('express');
const http = require('http');
const config = require('./config');
const ErrorMiddlewares = require('./middlewares/error.middleware');

const app = express();

// server middlewares -------- MIDDLEWARES USED BY EXPRESS APP
require('./middlewares/app.middleware')(app);

// DEFAULT ROUTE
app.get('/', (req, res) => {
	res.send('API IS RUNNING  🚨 🚨 🚨 🚨');
});

// error -------- ERROR MIDDLEWARES
ErrorMiddlewares(app);

// server ------- SERVING EXPRESS APP
const server = http.createServer(app);

//  server listening -------- LISTEN TO SERVER PORT
server.listen(config.PORT, async () => {
	await require('./config/mongo-db-config')(); // database connection ------ INITIALIZE MONGODB
	console.log(`:> Server running in ${process.env.NODE_ENV} mode on port :> ${config.PORT}`);
});

// server ------  ON  SERVER ERROR
server.on('error', (error) => {
	console.error(`< An error occurred on the server: \n ${error}`);
});
