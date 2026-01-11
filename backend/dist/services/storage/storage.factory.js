"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStorageService = createStorageService;
const local_storage_service_1 = require("./local.storage.service");
const s3_storage_service_1 = require("./s3.storage.service");
function createStorageService() {
    switch (process.env.STORAGE_DRIVER) {
        case "s3":
            return new s3_storage_service_1.S3StorageService();
        case "local":
        default:
            return new local_storage_service_1.LocalStorageService();
    }
}
