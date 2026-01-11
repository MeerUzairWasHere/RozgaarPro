"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoContent = exports.ForbiddenError = exports.ConflictError = exports.UnauthorizedError = exports.UnauthenticatedError = exports.BadRequestError = exports.NotFoundError = void 0;
const http_status_codes_1 = require("http-status-codes");
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.BadRequestError = BadRequestError;
class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthenticatedError";
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = http_status_codes_1.StatusCodes.FORBIDDEN;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
        this.statusCode = http_status_codes_1.StatusCodes.CONFLICT;
    }
}
exports.ConflictError = ConflictError;
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
        this.statusCode = http_status_codes_1.StatusCodes.FORBIDDEN;
    }
}
exports.ForbiddenError = ForbiddenError;
class NoContent extends Error {
    constructor(message) {
        super(message);
        this.name = "NoContent";
        this.statusCode = http_status_codes_1.StatusCodes.NO_CONTENT;
    }
}
exports.NoContent = NoContent;
