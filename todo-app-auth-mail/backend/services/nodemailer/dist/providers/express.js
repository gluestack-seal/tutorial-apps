"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locals_1 = __importDefault(require("./locals"));
const routes_1 = __importDefault(require("./routes"));
class Express {
    /**
     * Initialize the express server
     */
    constructor() {
        this.express = (0, express_1.default)();
        this.mountDotEnv();
        this.mountRoutes();
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
        this.express.use(express_1.default.json());
        this.express = routes_1.default.email(this.express);
    }
    /**
     * Start the express server
     */
    init() {
        const port = locals_1.default.config().port;
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
