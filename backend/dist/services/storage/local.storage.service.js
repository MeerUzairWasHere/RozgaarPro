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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageService = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class LocalStorageService {
    constructor() {
        this.basePath = path_1.default.join(process.cwd(), "uploads");
    }
    /**
     *
     * @param file - File buffer
     * @param filePath - File path
     * @param mimeType - File MIME type
     * @returns Promise that resolves to an object containing the file path.
     */
    upload(file, filePath, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullPath = path_1.default.join(this.basePath, filePath);
            yield promises_1.default.mkdir(path_1.default.dirname(fullPath), { recursive: true });
            yield promises_1.default.writeFile(fullPath, file);
            return {
                key: filePath,
            };
        });
    }
    /**
     * @param key - Filename
     * @returns Promise that resolves when the file is deleted
     */
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullPath = path_1.default.join(this.basePath, key);
            yield promises_1.default.unlink(fullPath);
        });
    }
    /**
     * Returns the public URL of a file in the local storage
     * @param key - Filename
     * @returns Public URL for the file
     **/
    getPublicUrl(key) {
        return `${process.env.APP_URL}/uploads/${key}`;
    }
}
exports.LocalStorageService = LocalStorageService;
