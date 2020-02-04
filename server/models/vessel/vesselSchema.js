const mongoose = require('mongoose');

const vesselSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = vessel = mongoose.model('vessel', vesselSchema);