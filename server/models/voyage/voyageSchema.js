const mongoose = require('mongoose');
const constants = require('../../common/constants');

const voyageSchema = new mongoose.Schema({
    vesselId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'vessel'
    },
    status: {
        type: String,
        required: true,
        default: constants.VOYAGE_STATUS.LOADING
    }
}, {
    timestamps: true
});

module.exports = voyage = mongoose.model('voyage', voyageSchema);