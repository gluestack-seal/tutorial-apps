import { Application } from "express";
import authentication from "../routes/authentication";

/**
 * Initialize all routes
 */
class Routes {
  public authentication(_express: Application): Application {
    return _express.use("/authentication", authentication);
  }
}

export default new Routes();
