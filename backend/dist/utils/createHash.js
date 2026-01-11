"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = void 0;
const crypto_1 = require("crypto");
const hashString = (string) => {
    return (0, crypto_1.createHash)("md5").update(string).digest("hex");
};
exports.hashString = hashString;
