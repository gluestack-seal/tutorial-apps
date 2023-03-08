import express from "express";
import Locals from "./locals";
import Routes from "./routes";

class Express {
  /**
   * Create the Express object
   */
  public express: express.Application;

  /**
   * Initialize the express server
   */
  constructor() {
    this.express = express();

    this.mountDotEnv();
    this.mountRoutes();
  }

  /**
   * Mount envirements variables
   */
  private mountDotEnv(): void {
    this.express = Locals.init(this.express);
  }

  /**
   * Mounts all the defined routes
   */
  private mountRoutes(): void {
    this.express.use(express.json());
    this.express = Routes.email(this.express);
  }

  /**
   * Start the express server
   */
  public init(): void {
    const port: number = Locals.config().port;

    // Start the server on the specified port
    this.express
      .listen(port, () => {
        console.log(
          "\x1b[33m%s\x1b[0m",
          `Server :: Running @ http://localhost:${port}`,
        );
      })
      .on("error", (_error: any) => {
        console.log("Error: ", _error.message);
      });
  }
}

/** Export the express module */
export default new Express();
