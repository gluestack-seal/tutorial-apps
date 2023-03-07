import * as express from "express";
import Locals from "./locals";
import Routes from "./routes";
const session = require('express-session');
const cors = require("cors");

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
    
    this.express.use(function (req:any, res:any, next:any) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
      );
      next();
    });
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
    this.express.use(cors({ exposedHeaders: ["x-hasura-user-token"] }));
    this.express.use(express.json());
    this.express.use(session({ secret: 'app-secret' }));
    this.express.engine("html", require("ejs").renderFile);
    this.express.set('view engine', 'html');
    this.express = Routes.authentication(this.express);
  }

  /**
   * Start the express server
   */
  public init(): void {
    const port = 9000;
    // Start the server on the specified port
    this.express
      .listen(port, () => {
        console.log(
          "\x1b[33m%s\x1b[0m",
          `Server :: Running @ http://localhost:${port}`,
        );
      })
      .on("error", (_error) => {
        console.log("Error: ", _error.message);
      });
  }
}

/** Export the express module */
export default new Express();
