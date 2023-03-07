"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer = require("multer");
// Others
const handlers_1 = __importDefault(require("../controllers/upload/handlers"));
const router = (0, express_1.Router)();
/**
 * Authentication routes
 */
const upload = multer();
router.post("/upload", upload.single("file"), handlers_1.default.upload);
router.get("/", (req, res) => {
    return res.json({ status: "ok" });
});
exports.default = router;
