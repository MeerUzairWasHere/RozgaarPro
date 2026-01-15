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
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const decorators_1 = require("../decorators");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.showCurrentUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const loggedInUser = (0, decorators_1.currentUser)(req);
            const user = yield this.userService.getCurrentUser(loggedInUser);
            res.status(http_status_codes_1.StatusCodes.OK).json(user);
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = (0, decorators_1.currentUser)(req);
            const tokenUser = yield this.userService.updateUser(id, req.body);
            res.status(http_status_codes_1.StatusCodes.OK).json({ user: tokenUser });
        });
        this.updateUserPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = (0, decorators_1.currentUser)(req);
            const result = yield this.userService.updateUserPassword(id, req.body);
            res.status(http_status_codes_1.StatusCodes.OK).json(result);
        });
    }
}
exports.UserController = UserController;
