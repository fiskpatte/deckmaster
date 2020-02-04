const InternalError = require('../common/errors').InternalError;

class baseService {
    constructor(dbModel) {
        if (dbModel && typeof dbModel === `object`) {
            this.dbModel = dbModel;
            this.source = `${dbModel.source}Service`;
        } else {
            throw new InternalError(`baseService`, `constructor`, `Not valid model ${dbModel}`);
        }
    };

    getAll = async () => {
        return await this.dbModel.get();
    };

    getById = async (id) => {
        return await this.dbModel.getById(id);
    };

    create = async (newElem) => {
        return await this.dbModel.create(newElem);
    };

    update = async (id, newElem) => {
        return await this.dbModel.update(id, newElem);
    };

    remove = async (id) => {
        return await this.dbModel.remove(id);
    };
}

module.exports = baseService;