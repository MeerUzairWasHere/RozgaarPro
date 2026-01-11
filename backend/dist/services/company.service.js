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
exports.CompanyService = void 0;
const errors_1 = require("../errors");
class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    createCompany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyAlreadyExists = yield this.companyRepository.findFirst();
            if (companyAlreadyExists) {
                throw new errors_1.ConflictError("Company already exists");
            }
            const company = yield this.companyRepository.create(data);
            return company;
        });
    }
    getCompany() {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository.findFirst();
            return company;
        });
    }
    updateComany(_a) {
        return __awaiter(this, arguments, void 0, function* ({ companyId, data, }) {
            yield this.getCompany();
            const company = yield this.companyRepository.update(companyId, data);
            return company;
        });
    }
    deleteCompany() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.companyRepository.deleteAll();
            return;
        });
    }
}
exports.CompanyService = CompanyService;
