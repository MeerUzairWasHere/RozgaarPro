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
exports.UserRepository = void 0;
class UserRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    // ==================== User Query Operations ====================
    getUserCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.user.count();
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.user.findUnique({
                where: { email },
            });
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.user.findUnique({
                where: { id: userId },
            });
        });
    }
    findByIdBasic(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.user.findUnique({
                where: { id: userId },
            });
        });
    }
    findByIdProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.user.findUnique({
                where: { id: userId },
            });
        });
    }
    findByEmailExcludingUser(email, excludeUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.user.findFirst({
                where: {
                    email,
                    id: { not: excludeUserId },
                },
            });
        });
    }
    checkEmailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prismaService.user.findUnique({
                where: { email },
                select: { id: true },
            });
            return !!user;
        });
    }
    // ==================== User Mutation Operations ====================
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.user.create({
                data,
            });
        });
    }
    update(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.user.update({
                where: { id: userId },
                data,
            });
        });
    }
    updatePassword(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaService.user.update({
                where: { id: userId },
                data,
            });
        });
    }
    updateUserVerification(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaService.user.update({
                where: { email },
                data,
            });
        });
    }
    updateUserPasswordToken(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaService.user.update({
                where: { email },
                data,
            });
        });
    }
    updateUserPassword(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaService.user.update({
                where: { email },
                data,
            });
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaService.user.delete({
                where: { id: userId },
            });
        });
    }
    // ==================== Token Operations ====================
    findTokenByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.token.findFirst({
                where: { user: { id: userId } },
            });
        });
    }
    createToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.token.create({
                data,
            });
        });
    }
    deleteUserTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaService.token.deleteMany({
                where: {
                    userId: userId,
                },
            });
        });
    }
}
exports.UserRepository = UserRepository;
