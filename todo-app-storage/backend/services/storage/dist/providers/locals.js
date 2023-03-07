"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
class Locals {
    /**
     * Initialize all env variables
     */
    static config() {
        dotenv.config({ path: path.join(__dirname, "../../.env") });
        const port = process.env.APP_PORT || "";
        const appId = process.env.APP_ID || "";
        const appBaseUrl = process.env.APP_BASE_URL || "";
        const maxUploadSize = parseInt(process.env.MAX_UPLOAD_SIZE || "10") || 10;
        const minioConfig = {
            adminEndPoint: process.env.MINIO_ADMIN_END_POINT || "",
            cdnEndPoint: process.env.MINIO_CDN_END_POINT || "",
            port: process.env.MINIO_PORT || "",
            useSSL: process.env.MINIO_USE_SSL || "",
            accessKey: process.env.MINIO_ACCESS_KEY || "",
            secretKey: process.env.MINIO_SECRET_KEY || "",
            buckets: {
                public: process.env.MINIO_PUBLIC_BUCKET || "",
                private: process.env.MINIO_PRIVATE_BUCKET || "",
            },
            tokenTimeout: process.env.MINIO_TOKEN_TIMEOUT || "3600",
        };
        const hasuraGraphqlUnauthorizedRole = process.env.HASURA_GRAPHQL_UNAUTHORIZED_ROLE || "";
        const hasuraGraphqlURL = process.env.HASURA_GRAPHQL_URL || "";
        const hasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET || "";
        return {
            port,
            appId,
            appBaseUrl,
            maxUploadSize,
            minioConfig,
            hasuraGraphqlUnauthorizedRole,
            hasuraAdminSecret,
            hasuraGraphqlURL,
        };
    }
    /**
     * Injects config in app's locals
     */
    static init(_express) {
        _express.locals.app = this.config();
        return _express;
    }
}
exports.default = Locals;
