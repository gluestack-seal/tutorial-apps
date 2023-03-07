"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const locals_1 = require("./locals");
const routes_1 = require("./routes");
const session = require('express-session');
const cors = require("cors");
class Express {
    /**
     * Initialize the express server
     */
    constructor() {
        this.express = express();
        this.mountDotEnv();
        this.mountRoutes();
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
    /**
     * Mount envirements variables
     */
    mountDotEnv() {
        this.express = locals_1.default.init(this.express);
    }
    /**
     * Mounts all the defined routes
     */
    mountRoutes() {
        this.express.use(cors({ exposedHeaders: ["x-hasura-user-token"] }));
        this.express.use(express.json());
        this.express.use(session({ secret: 'app-secret' }));
        this.express.engine("html", require("ejs").renderFile);
        this.express.set('view engine', 'html');
        this.express = routes_1.default.authentication(this.express);
    }
    /**
     * Start the express server
     */
    init() {
        const port = 9000;
        // Start the server on the specified port
        this.express
            .listen(port, () => {
            console.log("\x1b[33m%s\x1b[0m", `Server :: Running @ http://localhost:${port}`);
        })
            .on("error", (_error) => {
            console.log("Error: ", _error.message);
        });
    }
}
/** Export the express module */
exports.default = new Express();
//# sourceMappingURL=express.js.map