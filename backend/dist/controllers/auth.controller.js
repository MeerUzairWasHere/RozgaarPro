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
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
const decorators_1 = require("../decorators");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.registerUser(req.body, req.get("origin") || process.env.BASE_URL);
            res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // TODO: create one decorator for this
            const userAgent = req.headers["user-agent"] || "unknown";
            const ip = req.ip;
            if (!ip) {
                throw new errors_1.BadRequestError("IP address is required");
            }
            const { user, refreshToken } = yield this.authService.login(req.body, userAgent, ip);
            (0, utils_1.attachCookiesToResponse)({ res, user, refreshToken });
            res.status(http_status_codes_1.StatusCodes.OK).json(user);
        });
        this.verifyEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.verifyEmail(req.body);
            res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const loggedInUser = (0, decorators_1.currentUser)(req);
            const result = yield this.authService.logout(loggedInUser);
            res.cookie("accessToken", "logout", {
                httpOnly: true,
                expires: new Date(Date.now()),
            });
            res.cookie("refreshToken", "logout", {
                httpOnly: true,
                expires: new Date(Date.now()),
            });
            res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.forgotPassword(req.body, req.get("origin") || process.env.BASE_URL);
            res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.resetPassword(req.body);
            res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
    }
}
exports.AuthController = AuthController;
