import { Application } from "express";

import email from "../routes/email";

/**
 * Initialize all routes
 */
class Routes {
  public email(_express: Application): Application {
    return _express.use("/", email);
  }
}

export default new Routes();
