import { Application } from "express";

import storage from "../routes/storage";

/**
 * Initialize all routes
 */
class Routes {
  public storage(_express: Application): Application {
    return _express.use("/", storage);
  }
}

export default new Routes();
