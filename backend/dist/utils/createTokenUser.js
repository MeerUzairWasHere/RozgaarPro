"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenUser = void 0;
const createTokenUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        isVerified: user.isVerified,
    };
};
exports.createTokenUser = createTokenUser;
