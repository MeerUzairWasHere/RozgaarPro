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
exports.UserService = void 0;
const utils_1 = require("../utils");
const errors_1 = require("../errors");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getCurrentUser(tokenUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByIdBasic(tokenUser.id);
            if (!user) {
                return null;
            }
            return (0, utils_1.createTokenUser)(user);
        });
    }
    updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name } = data;
            if (email) {
                const existingUser = yield this.userRepository.findByEmailExcludingUser(email, userId);
                if (existingUser) {
                    throw new errors_1.UnauthenticatedError("Email already exists");
                }
            }
            const user = yield this.userRepository.update(userId, { email, name });
            return (0, utils_1.createTokenUser)(user);
        });
    }
    updateUserPassword(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { oldPassword, newPassword } = data;
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new errors_1.UnauthenticatedError("User not found");
            }
            const isPasswordCorrect = yield (0, utils_1.comparePassword)(oldPassword, user.password);
            if (!isPasswordCorrect) {
                throw new errors_1.UnauthenticatedError("Invalid Credentials");
            }
            if (oldPassword === newPassword) {
                throw new errors_1.UnauthenticatedError("New password must be different from old password");
            }
            const hashedNewPassword = yield (0, utils_1.hashPassword)(newPassword);
            yield this.userRepository.updatePassword(userId, {
                password: hashedNewPassword,
            });
            return { msg: "Success! Password Updated." };
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.delete(userId);
            return { msg: "User account deleted successfully" };
        });
    }
    getUsersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getUserCount();
        });
    }
}
exports.UserService = UserService;
