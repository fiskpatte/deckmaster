const baseService = require('./baseService');
const dbModel = require('../models/account/accountDB');

const accountDB = new dbModel();

class accountService extends baseService {
    constructor() {
        super(accountDB);
    }
}

module.exports = accountService;