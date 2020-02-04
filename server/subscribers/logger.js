const constants = require('../common/constants');
const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

module.exports.log = (source, method, message, body) => emitter.emit(constants.SUBSCRIBER_METHOD.LOG_ERROR, source, method, message, body);

emitter.on(constants.SUBSCRIBER_METHOD.LOG_ERROR, (source, method, message, body) => {
    //TODO: Save in DB
    console.log(source, method, message, body);
})