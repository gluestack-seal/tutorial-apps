import { Router } from "express";
const multer = require("multer");

// Others
import Controller from "../controllers/storage/handlers";
import Locals from "../providers/locals";

const router = Router();

/**
 * Authentication routes
 */
const upload = multer({
  limits: {
    fileSize: Locals.config().maxUploadSize * 1024 * 1024, // In Mb
 },
});

router.post("/upload", upload.single("file"), Controller.upload);
router.get("/get/:id", Controller.get);

export default router;
