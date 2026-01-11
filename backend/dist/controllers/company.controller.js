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
exports.CompanyController = void 0;
const http_status_codes_1 = require("http-status-codes");
class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
        this.createCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.companyService.createCompany(req.body);
            res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
        });
        this.getCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.companyService.getCompany();
            res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
        this.updateCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.companyService.updateComany({
                companyId: req.params.companyId,
                data: req.body,
            });
            res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
        this.deleteCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.companyService.deleteCompany();
            res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
        });
    }
}
exports.CompanyController = CompanyController;
