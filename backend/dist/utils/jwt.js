"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessTokens = exports.isTokenValid = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign, verify } = jsonwebtoken_1.default;
const createJWT = ({ payload, expiresIn }) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
};
exports.createJWT = createJWT;
const isTokenValid = (token) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return verify(token, process.env.JWT_SECRET);
};
exports.isTokenValid = isTokenValid;
const getAccessTokens = ({ user, refreshTokenHash, }) => {
    const accessToken = (0, exports.createJWT)({
        payload: { user },
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = (0, exports.createJWT)({
        payload: { user, refreshTokenHash },
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    return {
        accessToken,
        refreshToken,
    };
};
exports.getAccessTokens = getAccessTokens;
