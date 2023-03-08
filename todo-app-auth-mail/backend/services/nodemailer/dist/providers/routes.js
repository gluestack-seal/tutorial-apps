"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_1 = __importDefault(require("../routes/email"));
/**
 * Initialize all routes
 */
class Routes {
    email(_express) {
        return _express.use("/", email_1.default);
    }
}
exports.default = new Routes();
