"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermissions = void 0;
const client_1 = require("@prisma/client");
const errors_1 = require("../errors");
const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.role === client_1.Role.Admin)
        return;
    if (requestUser.id === resourceUserId.toString())
        return;
    throw new errors_1.UnauthorizedError("You don't have permission to access this resource.");
};
exports.checkPermissions = checkPermissions;
