"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const authGuard = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    console.log({ authHeader });
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
        throw new errors_1.UnauthenticatedError("Authentication Invalid");
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = (0, utils_1.isTokenValid)(token);
        req.user = payload.user;
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Access token expired");
    }
};
exports.authGuard = authGuard;
