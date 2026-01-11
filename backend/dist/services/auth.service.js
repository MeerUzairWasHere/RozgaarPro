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
exports.AuthService = void 0;
const crypto_1 = require("crypto");
const utils_1 = require("../utils");
const errors_1 = require("../errors");
const client_1 = require("@prisma/client");
class AuthService {
    constructor(emailService, userRepository, companyService) {
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.companyService = companyService;
    }
    registerUser(data, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password, username } = data;
            const userCount = yield this.userRepository.getUserCount();
            const role = userCount === 0 ? client_1.Role.SuperAdmin : client_1.Role.User;
            const hashedPassword = yield (0, utils_1.hashPassword)(password);
            const verificationToken = (0, crypto_1.randomBytes)(40).toString("hex");
            yield this.userRepository.createUser({
                name,
                email,
                username,
                password: hashedPassword,
                role,
                verificationToken: role === client_1.Role.User ? verificationToken : null,
                isVerified: role === client_1.Role.SuperAdmin ? true : false,
                verified: role === client_1.Role.SuperAdmin ? new Date() : null,
            });
            const hasCompany = yield this.companyService.getCompany();
            if (hasCompany === null || hasCompany === void 0 ? void 0 : hasCompany.verified_resend_domain) {
                yield this.emailService.sendVerificationEmail({
                    name,
                    email,
                    verificationToken,
                    origin,
                });
            }
            return {
                msg: "User created successfully",
            };
        });
    }
    login(data, userAgent, ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield this.userRepository.findUserByEmail(email);
            if (!user) {
                throw new errors_1.UnauthenticatedError("Invalid Credentials");
            }
            if (user.isVerified === false) {
                throw new errors_1.UnauthenticatedError("Please verify your email first");
            }
            const isPasswordCorrect = yield (0, utils_1.comparePassword)(password, user.password);
            if (!isPasswordCorrect) {
                throw new errors_1.UnauthenticatedError("Invalid Credentials");
            }
            const tokenUser = (0, utils_1.createTokenUser)(user);
            let refreshToken;
            const existingToken = yield this.userRepository.findTokenByUserId(user.id);
            if (existingToken) {
                if (!existingToken.isValid) {
                    throw new errors_1.UnauthenticatedError("Invalid Credentials");
                }
                refreshToken = existingToken.refreshToken;
            }
            else {
                refreshToken = (0, crypto_1.randomBytes)(40).toString("hex");
                yield this.userRepository.createToken({
                    refreshToken,
                    ip,
                    userAgent,
                    userId: user.id,
                });
            }
            return {
                user: tokenUser,
                refreshToken,
            };
        });
    }
    verifyEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { verificationToken, email } = data;
            const user = yield this.userRepository.findUserByEmail(email);
            if (!user) {
                throw new errors_1.UnauthenticatedError("Verification Failed");
            }
            if (user.verificationToken !== verificationToken) {
                throw new errors_1.UnauthenticatedError("Verification Failed");
            }
            yield this.userRepository.updateUserVerification(email, {
                isVerified: true,
                verified: new Date(),
                verificationToken: "",
            });
            yield this.emailService.sendWelcomeEmail({
                name: user.name,
                email: user.email,
            });
            return { msg: "Email Verified" };
        });
    }
    logout(tokenUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.deleteUserTokens(tokenUser.id);
            return { msg: "User logged out!" };
        });
    }
    forgotPassword(data, origin) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = data;
            const user = yield this.userRepository.findUserByEmail(email);
            if (!user) {
                return { msg: "User not found!" };
            }
            const passwordToken = (0, crypto_1.randomBytes)(70).toString("hex");
            const tenMinutes = 1000 * 60 * 10;
            const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
            yield this.userRepository.updateUserPasswordToken(email, {
                passwordToken: (0, utils_1.hashString)(passwordToken),
                passwordTokenExpirationDate,
            });
            yield this.emailService.sendResetPasswordEmail({
                name: user.name,
                email: user.email,
                token: passwordToken,
                origin,
            });
            return { msg: "Password reset email sent" };
        });
    }
    resetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, email, newPassword } = data;
            const user = yield this.userRepository.findUserByEmail(email);
            if (!user) {
                throw new errors_1.BadRequestError("Invalid or expired token");
            }
            const isTokenValid = user.passwordToken === (0, utils_1.hashString)(token) &&
                user.passwordTokenExpirationDate &&
                user.passwordTokenExpirationDate > new Date();
            if (!isTokenValid) {
                throw new errors_1.BadRequestError("Invalid or expired token");
            }
            const hashedPassword = yield (0, utils_1.hashPassword)(newPassword);
            yield this.userRepository.updateUserPassword(email, {
                password: hashedPassword,
                passwordToken: null,
                passwordTokenExpirationDate: null,
            });
            return { msg: "Password reset successfully!" };
        });
    }
}
exports.AuthService = AuthService;
