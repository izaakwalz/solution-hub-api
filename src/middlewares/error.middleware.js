'use strict';

const ErrorResponse = require('../utils/error-response');

const mongooseDuplicateError = (error) => {
	const [key, value] = Object.entries(error.keyValue)[0];
	const message = `${key} with value: '${value}' already exist`;
	return new ErrorResponse(message);
};

const mongooseValidationError = ({ errors }) => {
	let message;
	for (let key in errors) {
		message = errors[key].message;
	}
	return new ErrorResponse(message);
};

const mongooseCastError = ({ path, value }) => {
	const message = `Invalid ${path}: ${value}`;

	return new ErrorResponse(message);
};

module.exports = (app) => {
	app.use('*', (req, res, next) => {
		const message = `Resource not found :> can not ${req.method} request to ${req.originalUrl}`;
		return next(new ErrorResponse(message, 404));
	});

	app.use((error, req, res, next) => {
		let err = { ...error };

		if (error.name === 'MongoError') err = mongooseDuplicateError(error);
		if (error.name === 'ValidationError') err = mongooseValidationError(error);
		if (error.name === 'CastError') err = mongooseCastError(error);

		if (!(err instanceof ErrorResponse)) {
			err.statusCode = error.statusCode || 500;
			err.status = 'error';
			err.message = error.message || err.message || 'Internal Server error, please try again later';

			// console.log(error);
		}

		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
			stack: process.env.NODE_ENV === 'production' ? null : error.stack,
		});
	});

	return app;
};
