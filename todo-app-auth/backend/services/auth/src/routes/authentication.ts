import { Router } from "express";
import passport from "../providers/passport";

// Others
import Controller from "../controllers/authentication/handlers";
import Locals from "../providers/locals";
import Helpers from "../controllers/authentication/helpers";

const router = Router();

/**
 * Authentication routes
 */
router.post("/signin", Controller.signin);
router.post("/signup", Controller.signup);
router.get("/me", Controller.user);
router.post("/refresh-jwt-token", Controller.refreshJWTToken);

for (const provider of Locals.config().providers) {
  for (const prefix of ["signin", "signup"]) {
    router.get(`/${prefix}/${provider}`, passport.authenticate(provider));
    router.get(
      `/${prefix}/${provider}/callback`,
      passport.authenticate(provider, {
        successRedirect: `${Locals.config().appBaseUrl}/backend/${
        Locals.config().appId
      }/authentication/${prefix}/${provider}/callback/success`,
        failureRedirect: `${Locals.config().appBaseUrl}/backend/${
        Locals.config().appId
      }/authentication/${prefix}/${provider}/callback/failure`,
      }),
    );
    
    router.get(
      `/${prefix}/${provider}/callback/success`,
      Controller[`social${Helpers.capitalizeFirstLetter(prefix)}Success`],
    );
    router.get(
      `/${prefix}/${provider}/callback/failure`,
      Controller[`social${Helpers.capitalizeFirstLetter(prefix)}Failure`],
    );
  }
}

export default router;
