"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const errors_1 = require("../errors");
const currentUser = (req) => {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
        throw new errors_1.UnauthenticatedError("User not authenticated");
    }
    return req.user;
};
exports.currentUser = currentUser;
