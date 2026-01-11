"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpExceptionFilter = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpExceptionFilter = (err, req, res, next) => {
    // Log detailed errors in development mode
    if (process.env.NODE_ENV === "development") {
        console.error("Error Stack:", err.stack);
        console.error("Error Details:", err);
    }
    // Default error response
    const statusCode = err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || "Something went wrong, try again later";
    return res.status(statusCode).json(Object.assign({ msg: message }, (process.env.NODE_ENV === "development" && {
        stack: err.stack,
        details: err,
    })));
};
exports.httpExceptionFilter = httpExceptionFilter;
