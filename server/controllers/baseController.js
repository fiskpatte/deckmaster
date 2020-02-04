const express = require('express');
const auth = require('../common/auth');
const constants = require('../common/constants');
const BadRequestError = require('../common/errors').BadRequestError;

class baseController {
    constructor(service) {
        if (service && typeof service === `object`) {
            this.service = service;
            this.source = `${service.dbModel.source}Controller`;
            this.router = express.Router();
        } else {
            throw new InternalError(`baseController`, `constructor`, `Not valid service ${service}`);
        }
    }
    populateRoutes() {
        // router.get('/', (req, res, next) => auth.authenticate(req, res, next, constants.AUTH_LEVEL.BASIC), async (req, res, next) => {
        this.router.get('/', async (req, res, next) => {
            try {
                const elems = await this.service.getAll();
                if (elems && elems.length > 0) {
                    return res.json(elems);
                }
                throw new BadRequestError(this.source, `getAll`, `No elements found.`);
            } catch (err) {
                next(err);
            }
        });

        this.router.get('/:id', async (req, res, next) => {
            try {
                const elem = await this.service.getById(req.params.id);
                if (elem) {
                    return res.json(elem);
                }
                throw new BadRequestError(this.source, `getById`, `No element found with id ${req.params.id}.`);
            } catch (err) {
                next(err);
            }
        });

        this.router.post('/', async (req, res, next) => {
            try {
                const elem = await this.service.create(req.body);
                if (elem) {
                    return res.json(elem);
                }
                throw new BadRequestError(this.source, `create`, `Unable to create element.`);
            } catch (err) {
                next(err);
            }
        });

        this.router.put('/:id', async (req, res, next) => {
            try {
                const success = await this.service.update(req.params.id, req.body);
                if (success) {
                    return res.json(success);
                }
                throw new BadRequestError(this.source, `update`, `Unable to update element with id ${req.params.id}.`);
            } catch (err) {
                next(err);
            }
        });

        this.router.delete('/:id', async (req, res, next) => {
            try {
                const success = await this.service.remove(req.params.id);
                if (success) {
                    return res.json(success);
                }
                throw new BadRequestError(this.source, `remove`, `Unable to remove element with id ${req.params.id}.`);
            } catch (err) {
                next(err);
            }
        });
    }
}

module.exports = baseController;