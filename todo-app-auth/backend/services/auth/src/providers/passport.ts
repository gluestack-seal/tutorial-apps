import Locals from "./locals";
import * as passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oidc";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

if (Locals.config().googleClientId && Locals.config().googleClientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: Locals.config().googleClientId,
        clientSecret: Locals.config().googleClientSecret,
        callbackURL: `${Locals.config().appBaseUrl}/backend/${Locals.config().appId}/authentication/signin/google/callback`,
        scope: ["email"],
      },
      (req, profile, issuer, done) => {
        return done(null, profile?.emails[0]?.value || null);
      },
    ),
  );
}

if (Locals.config().microsoftClientId && Locals.config().microsoftClientSecret) {
  passport.use(
    new MicrosoftStrategy(
      {
        clientID: Locals.config().microsoftClientId,
        clientSecret: Locals.config().microsoftClientSecret,
        callbackURL: `${Locals.config().appBaseUrl}/backend/${Locals.config().appId}/authentication/signin/microsoft/callback`,
        scope: ["user.read"],
      },
      (req, issuer, profile, done) => {
        return done(null, profile?.emails[0]?.value || null);
      },
    ),
  );
}

if (Locals.config().githubClientId && Locals.config().githubClientSecret) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: Locals.config().githubClientId,
        clientSecret: Locals.config().githubClientSecret,
        callbackURL: `${Locals.config().appBaseUrl}/backend/${Locals.config().appId}/authentication/signin/github/callback`,
        scope: ["user:email"],
      },
      (req, issuer, profile, done) => {
        return done(null, profile?.emails[0]?.value || null);
      },
    ),
  );
}

if (Locals.config().googleClientId && Locals.config().googleClientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: Locals.config().googleClientId,
        clientSecret: Locals.config().googleClientSecret,
        callbackURL: `${Locals.config().appBaseUrl}/backend/${Locals.config().appId}/authentication/signup/google/callback`,
        scope: ["email"],
      },
      (req, profile, issuer, done) => {
        return done(null, profile?.emails[0]?.value || null);
      },
    ),
  );
}

if (Locals.config().microsoftClientId && Locals.config().microsoftClientSecret) {
  passport.use(
    new MicrosoftStrategy(
      {
        clientID: Locals.config().microsoftClientId,
        clientSecret: Locals.config().microsoftClientSecret,
        callbackURL: `${Locals.config().appBaseUrl}/backend/${Locals.config().appId}/authentication/signup/microsoft/callback`,
        scope: ["user.read"],
      },
      (req, issuer, profile, done) => {
        return done(null, profile?.emails[0]?.value || null);
      },
    ),
  );
}

if (Locals.config().githubClientId && Locals.config().githubClientSecret) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: Locals.config().githubClientId,
        clientSecret: Locals.config().githubClientSecret,
        callbackURL: `${Locals.config().appBaseUrl}/backend/${Locals.config().appId}/authentication/signup/github/callback`,
        scope: ["user:email"],
      },
      (req, issuer, profile, done) => {
        return done(null, profile?.emails[0]?.value || null);
      },
    ),
  );
}

passport.initialize();

passport.session();

export default passport;
