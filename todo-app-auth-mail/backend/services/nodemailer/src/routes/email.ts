import { Router } from "express";

import Email from "../controllers/email";

const router = Router();

/**
 * Email route
 */
// @ts-ignore
router.post("/send", Email.send);

export default router;