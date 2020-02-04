const vesselSchema = require('./vesselSchema');
const baseDB = require('../baseDB');

class vesselDB extends baseDB {
    constructor() {
        super(vesselSchema);
    }
}

module.exports = vesselDB;