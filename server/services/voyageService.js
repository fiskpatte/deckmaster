const BadRequestError = require('../common/errors').BadRequestError;
const baseService = require('./baseService');
const dbModel = require('../models/voyage/voyageDB');

const voyageDB = new dbModel();

class voyageService extends baseService {
    constructor() {
        super(voyageDB);
    };
    //Example, say vesselId was a primary key... You have to overrite create to handle this.
    create = async (voyage) => {
        if (voyage && voyage.vesselId) {
            const existingVoyage = await voyageDB.getByVessel(voyage.vesselId);
            if (existingVoyage && existingVoyage.length > 0) {
                throw new BadRequestError(this.source, `create`, `Voyage with vessel ${voyage.vesselId} already exists.`);
            }
            return await voyageDB.create(voyage);
        }
        throw new BadRequestError(this.source, `create`, `Required field "vesselId" is missing.`);
    };
    //Example, get all voyages for a vesselId
    getAllByVessel = async (vesselId) => {
        return await voyageDB.getAllByVessel(vesselId);
    };
}

module.exports = voyageService;