const constants = require('./constants');

class DeckmasterError extends Error {
    constructor(source, method, message){
        super(message);
        this.source = source;
        this.method = method;
    }
}

class InternalError extends DeckmasterError {
    constructor(source, method, message) {
        super(source, method, message);
        this.status = constants.ERROR_TYPE.INTERNAL_SERVER;
    }
}

class BadRequestError extends DeckmasterError {
    constructor(source, method, message) {
        super(source, method, message);
        this.status = constants.ERROR_TYPE.BAD_REQUEST;
    }
}

class NotFoundError extends DeckmasterError {
    constructor(source, method, message) {
        super(source, method, message);
        this.status = constants.ERROR_TYPE.NOT_FOUND;
    }
}

class UnauthorizedError extends DeckmasterError {
    constructor(source, method, message) {
        super(source, method, message);
        this.status = constants.ERROR_TYPE.UNAUTHORIZED;
    }
}

module.exports = {
    InternalError: InternalError,
    BadRequestError: BadRequestError,
    NotFoundError: NotFoundError,
    UnauthorizedError: UnauthorizedError
}