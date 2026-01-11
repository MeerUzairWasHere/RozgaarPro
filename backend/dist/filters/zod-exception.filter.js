"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodExceptionFilter = void 0;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const zodExceptionFilter = (err, req, res, next) => {
    // Handle Zod validation errors
    if (err instanceof zod_1.ZodError) {
        const errors = err.issues.map((error) => ({
            field: error.path.join("."),
            message: error.message,
        }));
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            msg: "Validation failed",
            errors,
        });
    }
    next(err);
};
exports.zodExceptionFilter = zodExceptionFilter;
