"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const container_1 = require("../container");
const decorators_1 = require("../decorators");
const validators_1 = require("../validators");
const guards_1 = require("../guards");
const router = (0, express_1.Router)();
router
    .route("/")
    .post(guards_1.authGuard, (0, guards_1.rolesGuard)(client_1.Role.Admin), (0, decorators_1.validate)(validators_1.validateCompanyCreateInput), container_1.companyController.createCompany)
    .get(guards_1.authGuard, (0, guards_1.rolesGuard)(client_1.Role.Admin), container_1.companyController.getCompany)
    .delete(guards_1.authGuard, (0, guards_1.rolesGuard)(client_1.Role.Admin), container_1.companyController.deleteCompany);
router
    .route("/:companyId")
    .patch(guards_1.authGuard, (0, guards_1.rolesGuard)(client_1.Role.Admin), (0, decorators_1.validate)(validators_1.validateCompanyUpdateInput), container_1.companyController.updateCompany);
exports.default = router;
