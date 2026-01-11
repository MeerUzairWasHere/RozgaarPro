"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesGuard = void 0;
const client_1 = require("@prisma/client");
const errors_1 = require("../errors");
const rolesGuard = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new errors_1.ForbiddenError("User not authenticated"));
        }
        if (req.user.role === client_1.Role.SuperAdmin) {
            return next();
        }
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return next(new errors_1.ForbiddenError(`Access denied. Required roles: ${allowedRoles.join(", ")}`));
        }
        next();
    };
};
exports.rolesGuard = rolesGuard;
