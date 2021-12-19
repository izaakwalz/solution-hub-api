const ErrorResponse = require('../utils/error-response');

module.exports = (app) => {
    app.use('*', (req, res, next) => {
        const message = `Resource not found :> can not ${req.method} request to ${req.originalUrl}`;
        return next(new ErrorResponse(message, 404));
    });

    app.use((error, req, res, next) => {
        let err = { ...error };

        if (error.name === 'MongoError') {
            const [key, value] = Object.entries(error.keyValue)[0];
            const message = `${key} with value: '${value}' already exist`;
            err = new ErrorResponse(message);
        }
        if (error.name === 'ValidationError') {
            const message = Object.values(err.errors).map((error) => error.message);
            err = new ErrorResponse(message.join(', '), 400);
        }
        if (error.name === 'CastError') {
            const { path, value } = error;
            const message = `Invalid ${path}: ${value}`;

            err = new ErrorResponse(message);
        }
        if (error.name === 'JsonWebTokenError')
            err = new ErrorResponse('Unauthorize access: Invalid token provided', 401);

        if (error.name === 'TokenExpiredError')
            err = new ErrorResponse('Unauthorize access: Token  expired, please login again', 401);

        if (!(err instanceof ErrorResponse)) {
            err.statusCode = error.statusCode || 500;
            err.status = 'error';
            err.message = error.message || err.message || 'Internal Server error, please try again later';
        }

        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
        });
    });

    return app;
};
