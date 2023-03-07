"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = __importDefault(require("./upload"));
class Authentication {
    upload(req, res) {
        return upload_1.default.handle(req, res);
    }
}
exports.default = new Authentication();
