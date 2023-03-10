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

    const authTokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN || "7D";

    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret";
    const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || "30D";

    const hasuraGraphqlUnauthorizedRole =
      process.env.HASURA_GRAPHQL_UNAUTHORIZED_ROLE || "";
    const hasuraGraphqlURL = process.env.HASURA_GRAPHQL_URL || "";
    const hasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET || "";
    const hasuraGraphqlUserRole = process.env.HASURA_GRAPHQL_USER_ROLE || "";

    const jwtSecret = process.env.HASURA_GRAPHQL_JWT_SECRET || "";
    const jwtKey = process.env.HASURA_GRAPHQL_JWT_KEY || "";

    const googleClientId = process.env.AUTH_GOOGLE_CLIENT_ID || "";
    const googleClientSecret = process.env.AUTH_GOOGLE_CLIENT_SECRET || "";

    const microsoftClientId = process.env.AUTH_MICROSOFT_CLIENT_ID || "";
    const microsoftClientSecret =
      process.env.AUTH_MICROSOFT_CLIENT_SECRET || "";

    const githubClientId = process.env.AUTH_GITHUB_CLIENT_ID || "";
    const githubClientSecret = process.env.AUTH_GITHUB_CLIENT_SECRET || "";

    const providers = ["google", "microsoft", "github"];

    return {
      port,
      appId,
      appBaseUrl,
      //
      authTokenExpiresIn,
      //
      refreshTokenSecret,
      refreshTokenExpiresIn,
      //
      hasuraGraphqlUnauthorizedRole,
      hasuraAdminSecret,
      hasuraGraphqlUserRole,
      hasuraGraphqlURL,
      //
      jwtSecret,
      jwtKey,
      //
      providers,
      //google
      googleClientId,
      googleClientSecret,
      //microsoft
      microsoftClientId,
      microsoftClientSecret,
      //github
      githubClientId,
      githubClientSecret,
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
