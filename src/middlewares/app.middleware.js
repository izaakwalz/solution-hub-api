const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors({ origin: true }));
    process.env.NODE_ENV === 'development' && app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/uploads', express.static('src/uploads'));

    return app;
};
