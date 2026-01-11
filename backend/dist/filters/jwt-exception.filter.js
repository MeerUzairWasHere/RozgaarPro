"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtExceptionFilter = void 0;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtExceptionFilter = (err, req, res, next) => {
    // Handle JWT token expired
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            msg: "Token has expired. Please login again.",
        });
    }
    // Handle invalid JWT token
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            msg: "Invalid token. Please login again.",
        });
    }
    // Pass to next error handler
    next(err);
};
exports.jwtExceptionFilter = jwtExceptionFilter;
