"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserUpdateInput = exports.validateUserCreateInput = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
//#region User
exports.validateUserCreateInput = zod_1.z.object({
    username: zod_1.z
        .string("username is required")
        .min(4, { message: "username must be at least 4 characters long" })
        .max(20, { message: "username must be at most 20 characters long" })
        .optional(),
    name: zod_1.z
        .string("name is required")
        .min(2, { message: "name must be at least 2 characters long" })
        .max(255, { message: "name must be at most 255 characters long" }),
    email: zod_1.z.email({ message: "Invalid email format" }).optional(),
    phone: zod_1.z
        .string("phone is required")
        .min(10, { message: "phone must be at least 10 characters long" })
        .max(15, { message: "phone must be at most 15 characters long" }),
    password: zod_1.z
        .string("password is required")
        .min(8, { message: "password must be at least 8 characters long" })
        .max(255, { message: "password must be at most 255 characters long" }),
    role: zod_1.z.enum(client_1.Role).default(client_1.Role.USER),
    isVerified: zod_1.z.boolean().default(false).optional(),
    verificationToken: zod_1.z.string().max(255).optional().nullable(),
    passwordToken: zod_1.z.string().max(255).optional().nullable(),
    passwordTokenExpirationDate: zod_1.z.date().optional().nullable(),
    verified: zod_1.z.date().optional().nullable(),
});
exports.validateUserUpdateInput = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(4, { message: "username must be at least 4 characters long" })
        .max(20, { message: "username must be at most 20 characters long" })
        .optional(),
    name: zod_1.z
        .string()
        .min(2, { message: "name must be at least 2 characters long" })
        .max(255, { message: "name must be at most 255 characters long" })
        .optional(),
    email: zod_1.z.email({ message: "Invalid email format" }).optional(),
    password: zod_1.z
        .string()
        .min(8, { message: "password must be at least 8 characters long" })
        .max(255, { message: "password must be at most 255 characters long" })
        .optional(),
    role: zod_1.z.enum(client_1.Role).optional(),
    isVerified: zod_1.z.boolean().optional(),
    verificationToken: zod_1.z.string().max(255).optional().nullable(),
    passwordToken: zod_1.z.string().max(255).optional().nullable(),
    passwordTokenExpirationDate: zod_1.z.date().optional().nullable(),
    verified: zod_1.z.date().optional().nullable(),
});
//#endregion
