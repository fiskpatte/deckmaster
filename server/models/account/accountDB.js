const accountSchema = require('./accountSchema');
const baseDB = require('../baseDB');

class accountDB extends baseDB {
    constructor() {
        super(accountSchema);
    }
}

module.exports = accountDB;