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
exports.CompanyRepository = void 0;
class CompanyRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    findFirst() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.company.findFirst();
        });
    }
    findById(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.company.findUnique({
                where: { id: companyId },
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.company.create({
                data,
            });
        });
    }
    update(companyId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prismaService.company.update({
                where: { id: companyId },
                data,
            });
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaService.company.deleteMany();
        });
    }
}
exports.CompanyRepository = CompanyRepository;
