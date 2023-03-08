"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_1 = __importDefault(require("../controllers/email"));
const router = (0, express_1.Router)();
/**
 * Email route
 */
// @ts-ignore
router.post("/send", email_1.default.send);
exports.default = router;
