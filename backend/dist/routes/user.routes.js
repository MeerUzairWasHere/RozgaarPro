"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const decorators_1 = require("../decorators");
const validators_1 = require("../validators");
const guards_1 = require("../guards");
const container_1 = require("../container");
const router = (0, express_1.Router)();
router.route("/current-user").get(guards_1.authGuard, container_1.userController.showCurrentUser);
router
    .route("/update-user")
    .patch(guards_1.authGuard, (0, decorators_1.validate)(validators_1.validateUserUpdateInput), container_1.userController.updateUser);
router
    .route("/update-user-password")
    .patch(guards_1.authGuard, (0, decorators_1.validate)(validators_1.validateUpdatePasswordInput), container_1.userController.updateUserPassword);
exports.default = router;
