"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("../providers/passport");
// Others
const handlers_1 = require("../controllers/authentication/handlers");
const locals_1 = require("../providers/locals");
const helpers_1 = require("../controllers/authentication/helpers");
const router = (0, express_1.Router)();
/**
 * Authentication routes
 */
router.post("/signin", handlers_1.default.signin);
router.post("/signup", handlers_1.default.signup);
router.get("/me", handlers_1.default.user);
router.post("/refresh-jwt-token", handlers_1.default.refreshJWTToken);
for (const provider of locals_1.default.config().providers) {
    for (const prefix of ["signin", "signup"]) {
        router.get(`/${prefix}/${provider}`, passport_1.default.authenticate(provider));
        router.get(`/${prefix}/${provider}/callback`, passport_1.default.authenticate(provider, {
            successRedirect: `${locals_1.default.config().appBaseUrl}/backend/${locals_1.default.config().appId}/authentication/${prefix}/${provider}/callback/success`,
            failureRedirect: `${locals_1.default.config().appBaseUrl}/backend/${locals_1.default.config().appId}/authentication/${prefix}/${provider}/callback/failure`,
        }));
        router.get(`/${prefix}/${provider}/callback/success`, handlers_1.default[`social${helpers_1.default.capitalizeFirstLetter(prefix)}Success`]);
        router.get(`/${prefix}/${provider}/callback/failure`, handlers_1.default[`social${helpers_1.default.capitalizeFirstLetter(prefix)}Failure`]);
    }
}
exports.default = router;
//# sourceMappingURL=authentication.js.map