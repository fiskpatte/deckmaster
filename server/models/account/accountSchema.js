const mongoose = require('mongoose');
const constants = require('../../common/constants');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    authLevel: {
        type: String,
        required: true,
        default: constants.AUTH_LEVEL.BASIC
    }

}, {
    timestamps: true
});

module.exports = account = mongoose.model('account', accountSchema);