const baseService = require('./baseService');
const dbModel = require('../models/vessel/vesselDB');

const vesselDB = new dbModel();

class vesselService extends baseService {
    constructor() {
        super(vesselDB);
    }
}

module.exports = vesselService;