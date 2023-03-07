"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Minio = require("minio");
const locals_1 = __importDefault(require("../../providers/locals"));
class Helpers {
    /**
     * Create minio client
     */
    minioClient() {
        return new Minio.Client({
            endPoint: locals_1.default.config().endPoint,
            port: parseInt(locals_1.default.config().minioPort),
            useSSL: locals_1.default.config().useSSL === "true",
            accessKey: locals_1.default.config().accessKey,
            secretKey: locals_1.default.config().secretKey,
        });
    }
}
exports.default = new Helpers();
