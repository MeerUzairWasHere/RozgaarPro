"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const container_1 = require("../container");
const authGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken, accessToken } = req.signedCookies;
    try {
        if (accessToken) {
            const payload = (0, utils_1.isTokenValid)(accessToken);
            req.user = payload.user;
            return next();
        }
        const payload = (0, utils_1.isTokenValid)(refreshToken);
        const existingToken = yield container_1.prismaService.token.findFirst({
            where: {
                userId: payload.user.userId,
                refreshToken: payload.refreshToken,
                isValid: true,
            },
        });
        if (!existingToken) {
            // Use next(error) instead of throw
            return next(new errors_1.UnauthenticatedError("Authentication Invalid"));
        }
        (0, utils_1.attachCookiesToResponse)({
            res,
            user: payload.user,
            refreshToken: existingToken.refreshToken,
        });
        req.user = payload.user;
        next();
    }
    catch (error) {
        // Pass error to next() instead of throwing
        next(new errors_1.UnauthenticatedError("Authentication Invalid"));
    }
});
exports.authGuard = authGuard;
