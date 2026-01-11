"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachCookiesToResponse = exports.isTokenValid = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign, verify } = jsonwebtoken_1.default;
const createJWT = ({ payload }) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const token = sign(payload, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
const isTokenValid = (token) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return verify(token, process.env.JWT_SECRET);
};
exports.isTokenValid = isTokenValid;
const attachCookiesToResponse = ({ res, user, refreshToken, }) => {
    const accessTokenJWT = (0, exports.createJWT)({ payload: { user } });
    const refreshTokenJWT = (0, exports.createJWT)({ payload: { user, refreshToken } });
    const oneDay = 1000 * 60 * 60 * 24;
    const longerExp = 1000 * 60 * 60 * 24 * 30;
    res.cookie("accessToken", accessTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
        expires: new Date(Date.now() + oneDay),
    });
    res.cookie("refreshToken", refreshTokenJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
        expires: new Date(Date.now() + longerExp),
    });
};
exports.attachCookiesToResponse = attachCookiesToResponse;
// // Optional: Attach a single cookie (Uncomment and use if needed)
// export const attachSingleCookieToResponse = ({
//   res,
//   user,
// }: {
//   res: any; // Adjust this type based on your framework
//   user: Record<string, any>;
// }): void => {
//   const token = createJWT({ payload: user });
//   const oneDay = 1000 * 60 * 60 * 24;
//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//   });
// };
