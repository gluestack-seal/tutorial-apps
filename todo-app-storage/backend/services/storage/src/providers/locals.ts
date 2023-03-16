import { Application } from "express";
import * as path from "path";
import * as dotenv from "dotenv";

class Locals {
  /**
   * Initialize all env variables
   */
  public static config(): any {
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

    const hasuraGraphqlUnauthorizedRole =
      process.env.HASURA_GRAPHQL_UNAUTHORIZED_ROLE || "";
    const hasuraGraphqlURL = process.env.HASURA_GRAPHQL_URL || "";
    const hasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET || "";

    const middleware = {
      shared: {
        secret: process.env.MIDDLEWARE_SHARED_SECRET || "",
      },
      webhook: {
        url: process.env.MIDDLEWARE_WEBHOOK_URL || "",
      },
      use: process.env.MIDDLEWARE_USE || "no-auth",
    };

    return {
      port,
      appId,
      appBaseUrl,
      maxUploadSize,
      minioConfig,
      hasuraGraphqlUnauthorizedRole,
      hasuraAdminSecret,
      hasuraGraphqlURL,
      middleware,
    };
  }

  /**
   * Injects config in app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
