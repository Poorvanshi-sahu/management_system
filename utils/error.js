const statusCodes = require("../config/constants/statusCodes");

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = statusCodes.BAD_REQUEST;
        this.message = message;
    }
}
class OperationalError extends Error {
    constructor(message) {
        super(message);
        this.name = 'OperationalError';
        this.statusCode = statusCodes.BAD_REQUEST;
        this.message = message;
    }
}

module.exports = {
    ValidationError,
    OperationalError
};