"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaExceptionFilter = void 0;
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("@prisma/client");
const prismaExceptionFilter = (err, req, res, next) => {
    var _a, _b, _c, _d;
    // Handle Prisma known request errors
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        let statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        let message = err.message;
        switch (err.code) {
            case "P2002":
                // Unique constraint violation
                const target = ((_a = err.meta) === null || _a === void 0 ? void 0 : _a.target) || [];
                message = `Duplicate entry: A record with the same ${target.join(", ")} already exists.`;
                statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
                break;
            case "P2003":
                // Foreign key constraint failed
                message = `Foreign key constraint failed: Invalid reference to another table.`;
                statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
                break;
            case "P2025":
                // Record not found
                message = `Record not found: The requested record does not exist.`;
                statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
                break;
            case "P2016":
                // Query interpretation error
                message = `Query interpretation error: ${((_b = err.meta) === null || _b === void 0 ? void 0 : _b.message) || "Invalid query syntax or missing fields."}`;
                statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
                break;
            case "P2001":
                // Record does not exist
                message = `Record does not exist: The filtered record does not exist.`;
                statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
                break;
            case "P2014":
                // Required relation violation
                message = `Required relation violation: ${((_c = err.meta) === null || _c === void 0 ? void 0 : _c.message) || "A required relation is missing."}`;
                statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
                break;
            case "P2015":
                // Missing required value
                message = `Missing required value: ${((_d = err.meta) === null || _d === void 0 ? void 0 : _d.message) || "A required field is NULL or missing."}`;
                statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
                break;
            default:
                message = `Prisma error: ${err.message}`;
                statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
                break;
        }
        return res.status(statusCode).json({ msg: message });
    }
    // Handle Prisma unknown request errors
    if (err instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: `Database error: ${err.message}`,
        });
    }
    // Handle Prisma validation errors
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            msg: `Validation error: ${err.message}`,
        });
    }
    // Pass to next error handler
    next(err);
};
exports.prismaExceptionFilter = prismaExceptionFilter;
