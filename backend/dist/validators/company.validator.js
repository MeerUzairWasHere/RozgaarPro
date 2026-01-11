"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCompanyUpdateInput = exports.validateCompanyCreateInput = void 0;
const zod_1 = require("zod");
exports.validateCompanyCreateInput = zod_1.z.object({
    name: zod_1.z
        .string("name is required")
        .min(1, { message: "name is required" })
        .max(255, { message: "name must be at most 255 characters long" }),
    address: zod_1.z
        .string("address is required")
        .min(1, { message: "address is required" })
        .max(255, { message: "address must be at most 255 characters long" }),
    website: zod_1.z
        .url({ message: "Invalid website URL format" })
        .min(1, { message: "website is required" })
        .max(255, { message: "website must be at most 255 characters long" }),
    phone: zod_1.z
        .string("phone is required")
        .min(1, { message: "phone is required" })
        .max(255, { message: "phone must be at most 255 characters long" }),
    email: zod_1.z
        .email({ message: "Invalid email format" })
        .min(1, { message: "email is required" })
        .max(255, { message: "email must be at most 255 characters long" }),
    verified_resend_domain: zod_1.z
        .string("verified_resend_domain is required")
        .min(1, { message: "verified_resend_domain is required" })
        .max(55, {
        message: "verified_resend_domain must be at most 55 characters long",
    }),
});
exports.validateCompanyUpdateInput = exports.validateCompanyCreateInput.partial();
