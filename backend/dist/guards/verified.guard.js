"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifiedGuard = void 0;
const errors_1 = require("../errors");
const verifiedGuard = (req, res, next) => {
    if (!req.user) {
        return next(new errors_1.ForbiddenError("User not authenticated"));
    }
    if (!req.user.isVerified) {
        return next(new errors_1.ForbiddenError("Please verify your email first"));
    }
    next();
};
exports.verifiedGuard = verifiedGuard;
