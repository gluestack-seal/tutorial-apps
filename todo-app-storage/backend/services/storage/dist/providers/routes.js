"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = __importDefault(require("../routes/storage"));
/**
 * Initialize all routes
 */
class Routes {
    storage(_express) {
        return _express.use("/", storage_1.default);
    }
}
exports.default = new Routes();
