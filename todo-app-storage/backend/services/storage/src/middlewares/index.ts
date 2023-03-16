import Locals from "../providers/locals";
import noAuthMiddleware from "./noAuthMiddleware";
import jwtAuthMiddleware from "./jwtAuthMiddleware";
import sharedTokenMiddleware from "./sharedTokenMiddleware";
import webhookAuthMiddleware from "./webhookAuthMiddleware";

let myMiddleware = noAuthMiddleware;

switch (Locals.config().middleware.use) {
  case "shared-token-auth":
    myMiddleware = sharedTokenMiddleware;
    break;
  case "jwt-auth":
    myMiddleware = jwtAuthMiddleware;
    break;
  case "webhook-auth":
    myMiddleware = webhookAuthMiddleware;
    break;
}

export default myMiddleware;