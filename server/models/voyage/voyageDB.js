const voyageSchema = require('./voyageSchema');
const baseDB = require('../baseDB');

class voyageDB extends baseDB {
    constructor() {
        super(voyageSchema);
    }
    //Naming is just a shit I made up for the examples to make a difference between a method that returns one or multiple elements
    getByVessel = async (vesselId) => {
        return await voyageSchema.find({ vesselId })
            .then(voyage => voyage)
            .catch(err => {
                throw new InternalError(this.source, `getByVessel`, err);
            })
    }

    getAllByVessel = async (vesselId) => {
        return await voyageSchema.find({ vesselId })
            .then(voyages => voyages)
            .catch(err => {
                throw new InternalError(this.source, `getAllByVessel`, err);
            })
    }
}

module.exports = voyageDB;