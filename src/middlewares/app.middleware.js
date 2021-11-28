const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors({ origin: true }));
    process.env.NODE_ENV === 'development' && app.use(morgan('dev'));
    app.use(express.json({ limit: '50mb', extended: true }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use('/uploads', express.static('src/uploads'));

    return app;
};
