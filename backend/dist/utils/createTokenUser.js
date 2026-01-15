"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenUser = void 0;
const createTokenUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        role: user.role,
        phone: user.phone,
        isVerified: user.isVerified,
    };
};
exports.createTokenUser = createTokenUser;
