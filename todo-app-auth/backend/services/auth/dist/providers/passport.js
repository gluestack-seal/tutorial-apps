"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const locals_1 = require("./locals");
const passport = require("passport");
const passport_google_oidc_1 = require("passport-google-oidc");
const passport_microsoft_1 = require("passport-microsoft");
const passport_github2_1 = require("passport-github2");
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
if (locals_1.default.config().googleClientId && locals_1.default.config().googleClientSecret) {
    passport.use(new passport_google_oidc_1.Strategy({
        clientID: locals_1.default.config().googleClientId,
        clientSecret: locals_1.default.config().googleClientSecret,
        callbackURL: `${locals_1.default.config().appBaseUrl}/backend/${locals_1.default.config().appId}/authentication/signin/google/callback`,
        scope: ["email"],
    }, (req, profile, issuer, done) => {
        var _a;
        return done(null, ((_a = profile === null || profile === void 0 ? void 0 : profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value) || null);
    }));
}
if (locals_1.default.config().microsoftClientId && locals_1.default.config().microsoftClientSecret) {
    passport.use(new passport_microsoft_1.Strategy({
        clientID: locals_1.default.config().microsoftClientId,
        clientSecret: locals_1.default.config().microsoftClientSecret,
        callbackURL: `${locals_1.default.config().appBaseUrl}/backend/${locals_1.default.config().appId}/authentication/signin/microsoft/callback`,
        scope: ["user.read"],
    }, (req, issuer, profile, done) => {
        var _a;
        return done(null, ((_a = profile === null || profile === void 0 ? void 0 : profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value) || null);
    }));
}
if (locals_1.default.config().githubClientId && locals_1.default.config().githubClientSecret) {
    passport.use(new passport_github2_1.Strategy({
        clientID: locals_1.default.config().githubClientId,
        clientSecret: locals_1.default.config().githubClientSecret,
        callbackURL: `${locals_1.default.config().appBaseUrl}/backend/${locals_1.default.config().appId}/authentication/signin/github/callback`,
        scope: ["user:email"],
    }, (req, issuer, profile, done) => {
        var _a;
        return done(null, ((_a = profile === null || profile === void 0 ? void 0 : profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value) || null);
    }));
}
if (locals_1.default.config().googleClientId && locals_1.default.config().googleClientSecret) {
    passport.use(new passport_google_oidc_1.Strategy({
        clientID: locals_1.default.config().googleClientId,
        clientSecret: locals_1.default.config().googleClientSecret,
        callbackURL: `${locals_1.default.config().appBaseUrl}/backend/${locals_1.default.config().appId}/authentication/signup/google/callback`,
        scope: ["email"],
    }, (req, profile, issuer, done) => {
        var _a;
        return done(null, ((_a = profile === null || profile === void 0 ? void 0 : profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value) || null);
    }));
}
if (locals_1.default.config().microsoftClientId && locals_1.default.config().microsoftClientSecret) {
    passport.use(new passport_microsoft_1.Strategy({
        clientID: locals_1.default.config().microsoftClientId,
        clientSecret: locals_1.default.config().microsoftClientSecret,
        callbackURL: `${locals_1.default.config().appBaseUrl}/backend/${locals_1.default.config().appId}/authentication/signup/microsoft/callback`,
        scope: ["user.read"],
    }, (req, issuer, profile, done) => {
        var _a;
        return done(null, ((_a = profile === null || profile === void 0 ? void 0 : profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value) || null);
    }));
}
if (locals_1.default.config().githubClientId && locals_1.default.config().githubClientSecret) {
    passport.use(new passport_github2_1.Strategy({
        clientID: locals_1.default.config().githubClientId,
        clientSecret: locals_1.default.config().githubClientSecret,
        callbackURL: `${locals_1.default.config().appBaseUrl}/backend/${locals_1.default.config().appId}/authentication/signup/github/callback`,
        scope: ["user:email"],
    }, (req, issuer, profile, done) => {
        var _a;
        return done(null, ((_a = profile === null || profile === void 0 ? void 0 : profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value) || null);
    }));
}
passport.initialize();
passport.session();
exports.default = passport;
//# sourceMappingURL=passport.js.map