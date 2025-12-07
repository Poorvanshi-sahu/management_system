const statusCodes = require("../config/constants/statusCodes");

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = statusCodes.BAD_REQUEST;
        this.message = message;
    }
}

class PermissionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PermissionError';
        this.statusCode = statusCodes.BAD_REQUEST;
        this.message = message;
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthorizationError';
        this.message = message;
        this.statusCode = statusCodes.BAD_REQUEST;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = statusCodes.NOT_FOUND;
        this.message = message;
    }
}
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
        this.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
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

class CustomError extends Error {
    constructor(message, err, errorName, type) {
        super(message);
        this.name = errorName;
        this.statusCode = statusCodes.BAD_REQUEST;
        this.message = message;
        this.type = type;
    }
}

class CustomValidationErrorWithData extends ValidationError {
    constructor(message, err, errorName, type, data = {}) {
        super(message);
        this.name = errorName;
        this.statusCode = statusCodes.BAD_REQUEST;
        this.message = message;
        this.type = type;
        this.data = data;
    }
}

module.exports = {
    ValidationError,
    PermissionError,
    AuthorizationError,
    DatabaseError,
    NotFoundError,
    OperationalError,
    CustomError,
    CustomValidationErrorWithData,
};