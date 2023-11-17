import httpStatusCode from "http-status-codes";
import * as errorKeys from "./errorKeys";

class BaseError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(name: string, statusCode: number, isOperational: boolean, description: string) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

export class ResourceNotFoundError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCode.NOT_FOUND,
        message = 'Resource not found.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, message)
    }
}

export class BadRequest extends BaseError {
    errorKey: string;
    constructor(
        name,
        statusCode = httpStatusCode.BAD_REQUEST,
        message = 'Duplicate entry found',
        isOperational = true,
        errorKey = errorKeys.INTERNAL_SERVER_ERROR
    ) {
        super(name, statusCode, isOperational, message)
        this.errorKey = errorKey;
    }
}

export class InternalServerError extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCode.INTERNAL_SERVER_ERROR,
        description = 'Internal Server error.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

export default BaseError;
