"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitExceptionFilter = void 0;
const http_status_codes_1 = require("http-status-codes");
const rateLimitExceptionFilter = (err, req, res, next) => {
    // Check if error is from express-rate-limit
    if (err.statusCode === http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS ||
        err.statusCode === 429) {
        const retryAfter = err.retryAfter || "15 minutes";
        return res.status(http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS).json({
            msg: err.message || "Too many requests. Please try again later.",
            retryAfter,
        });
    }
    // Handle rate limit errors from custom rate limiters
    if (err.name === "RateLimitError" || err.type === "rate-limit") {
        return res.status(http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS).json({
            msg: err.message ||
                "Too many requests from this IP. Please try again later.",
            retryAfter: err.retryAfter || "Unknown",
        });
    }
    // Handle errors with 'Too many' in the message (fallback)
    if (err.message && err.message.toLowerCase().includes("too many")) {
        return res.status(http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS).json({
            msg: err.message,
            retryAfter: err.retryAfter || "Please try again later",
        });
    }
    next(err);
};
exports.rateLimitExceptionFilter = rateLimitExceptionFilter;
