"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const send_1 = __importDefault(require("./send"));
class Email {
    send(req, res) {
        return send_1.default.handle(req, res);
    }
}
exports.default = new Email();
