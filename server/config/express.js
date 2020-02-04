const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../subscribers/logger');
const NotFoundError = require('../common/errors').NotFoundError;
const routes = require('./routes');

const connectExpress = async ({ app }) => {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get('/', (req, res) => res.send('Hello world!'));

    routes({ app });

    app.use((req, res, next) => {
        throw new NotFoundError(`express`, `404Middleware`, `Route ${req.originalUrl} not found. Method ${req.method}`)
    });

    app.use((error, req, res, next) => {
        logger.log(error.source || "", error.method || "", error.message, req.body);
        res.status(error.status || 500).json({ message: error.message });
    });
}

module.exports = connectExpress;