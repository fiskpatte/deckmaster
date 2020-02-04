const InternalError = require('../common/errors').InternalError;
const mongoose = require('mongoose');

const validateSchema = (obj) => {
    let schema = obj || {};
    return schema.prototype instanceof mongoose.Model;
}

class baseDB {
    constructor(schema) {
        if (validateSchema(schema)) {
            this.schema = schema;
            this.source = schema.modelName;
        } else {
            throw new InternalError(`baseDB`, `constructor`, `Not valid schema ${schema}`);
        }
    };

    get = async () => {
        return await this.schema.find()
            .then(elems => elems)
            .catch(err => {
                throw new InternalError(this.source, `getAll`, err);
            });
    };

    getById = async (id) => {
        return await this.schema.findById(id)
            .then(elem => elem)
            .catch(err => {
                throw new InternalError(this.source, `getById`, err);
            })
    };

    create = async (newElem) => {
        return await this.schema.create(newElem)
            .then(elem => elem)
            .catch(err => {
                throw new InternalError(this.source, `create`, err);
            });
    };

    update = async (id, newElem) => {
        return await this.schema.findByIdAndUpdate(id, newElem)
            .then(elem => true)
            .catch(err => {
                throw new InternalError(this.source, `update`, err);
            });
    };

    remove = async (id) => {
        return await this.schema.findByIdAndRemove(id)
            .then(elem => true)
            .catch(err => {
                throw new InternalError(this.source, `remove`, err);
            });
    };
}


module.exports = baseDB;