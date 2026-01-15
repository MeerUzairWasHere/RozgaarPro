"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPasswordInput = exports.validateForgotPasswordInput = exports.validateVerifyEmailInput = exports.validateUpdatePasswordInput = exports.validateLoginInput = exports.validateRegisterInput = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
//#region Auth
exports.validateRegisterInput = zod_1.z.object({
    name: zod_1.z
        .string("name is required")
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(255, { message: "Name must be at most 255 characters long" }),
    phone: zod_1.z
        .string("phone is required")
        .min(10, { message: "phone must be at least 10 characters long" })
        .max(15, { message: "phone must be at most 15 characters long" }),
    password: zod_1.z
        .string("password is required")
        .min(8, { message: "password must be at least 8 characters long" })
        .max(20, { message: "password must be at most 20 characters long" }),
    role: zod_1.z.enum([client_1.Role.USER, client_1.Role.FREELANCER]),
});
exports.validateLoginInput = zod_1.z.object({
    email: zod_1.z.email({ message: "Invalid email format" }).optional(),
    phone: zod_1.z
        .string("Should be a valid phone number")
        .min(10, { message: "phone must be at least 10 characters long" })
        .max(15, { message: "phone must be at most 15 characters long" })
        .optional(),
    password: zod_1.z
        .string("password is required")
        .min(1, { message: "password is required" }),
});
exports.validateUpdatePasswordInput = zod_1.z.object({
    oldPassword: zod_1.z
        .string("oldPassword is required")
        .min(1, { message: "oldPassword is required" }),
    newPassword: zod_1.z
        .string("newPassword is required")
        .min(8, { message: "newPassword must be at least 8 characters long" })
        .max(20, { message: "newPassword must be at most 20 characters long" }),
});
exports.validateVerifyEmailInput = zod_1.z.object({
    verificationToken: zod_1.z
        .string("verificationToken is required")
        .min(1, { message: "verificationToken is required" }),
    email: zod_1.z
        .email({ message: "Invalid email format" })
        .min(1, { message: "email is required" }),
});
exports.validateForgotPasswordInput = zod_1.z.object({
    email: zod_1.z
        .email({ message: "Invalid email format" })
        .min(1, { message: "email is required" }),
});
exports.validateResetPasswordInput = zod_1.z.object({
    token: zod_1.z.string("token is required").min(1, { message: "Token is required" }),
    newPassword: zod_1.z
        .string("newPassword is required")
        .min(8, { message: "newPassword must be at least 8 characters long" })
        .max(20, { message: "newPassword must be at most 20 characters long" }),
    email: zod_1.z
        .email({ message: "Invalid email format" })
        .min(1, { message: "email is required" }),
});
//#endregion
