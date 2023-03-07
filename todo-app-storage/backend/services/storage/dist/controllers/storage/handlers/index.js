"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = __importDefault(require("./upload"));
const get_1 = __importDefault(require("./get"));
const file_1 = __importDefault(require("./file"));
class Authentication {
    upload(req, res) {
        return upload_1.default.handle(req, res);
    }
    get(req, res) {
        return get_1.default.handle(req, res);
    }
    file(req, res) {
        return file_1.default.handle(req, res);
    }
}
exports.default = new Authentication();
