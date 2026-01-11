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
exports.S3StorageService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
class S3StorageService {
    constructor() {
        this.s3 = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        this.bucket = process.env.AWS_S3_BUCKET;
    }
    /**
     * Uploads a file to S3
     *
     * @param file - File buffer
     * @param key - S3 object key
     * @param mimeType - File MIME type
     * @returns Promise that resolves to an object containing the S3 object key.
     */
    upload(file, key, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3.send(new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file,
                ContentType: mimeType,
            }));
            return {
                key,
            };
        });
    }
    /**
     * Deletes an object from S3
     *
     * @param key - S3 object key
     * @returns Promise that resolves when the object is deleted
     */
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.s3.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucket,
                Key: key,
            }));
        });
    }
    /**
     * Returns the public URL of an object in S3
     *
     * @param key - S3 object key
     * @returns Public S3 URL for the object
     */
    getPublicUrl(key) {
        return `https://${this.bucket}.s3.amazonaws.com/${key}`;
    }
    /**
     * Generates a temporary signed URL to access a private S3 object.
     *
     * @param key - S3 object key
     * @param options.expiresInSeconds - URL expiry time in seconds (optional) - default is 5 minutes
     * @returns Signed URL valid for a limited time
     */
    getSignedUrl(key, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });
            return (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, {
                expiresIn: (_a = options === null || options === void 0 ? void 0 : options.expiresInSeconds) !== null && _a !== void 0 ? _a : 60 * 5, // 5 minutes
            });
        });
    }
}
exports.S3StorageService = S3StorageService;
