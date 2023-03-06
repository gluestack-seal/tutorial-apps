"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const locals_1 = require("../../providers/locals");
class Helpers {
    /**
     * Create Token
     */
    CreateToken(_payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const expires_in = locals_1.default.config().authTokenExpiresIn;
            const tokenContents = {
                id: _payload.id.toString(),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": _payload.allowed_roles,
                    "x-hasura-default-role": _payload.default_role,
                    "x-hasura-user-id": _payload.id.toString(),
                },
            };
            const token = jwt.sign(tokenContents, locals_1.default.config().jwtSecret, {
                algorithm: locals_1.default.config().jwtKey,
                expiresIn: expires_in,
            });
            const refreshToken = yield this.CreateRefreshToken(_payload);
            return {
                token,
                refreshToken,
            };
        });
    }
    /**
     * Create Refresh Token
     */
    CreateRefreshToken(_payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const refresh_token = jwt.sign(_payload, locals_1.default.config().refreshTokenSecret, {
                expiresIn: locals_1.default.config().refreshTokenExpiresIn,
            });
            return refresh_token;
        });
    }
    /**
     * Verify JWT Token
     */
    verifyJWTToken(token) {
        try {
            const verifiedToken = jwt.verify(token, locals_1.default.config().jwtSecret);
            return { success: true, token: verifiedToken };
        }
        catch (err) {
            return { success: false, error: err };
        }
    }
    /**
     * Verify Refresh Token
     */
    verifyRefreshToken(token) {
        try {
            const verifiedToken = jwt.verify(token, locals_1.default.config().refreshTokenSecret);
            return { success: true, token: verifiedToken };
        }
        catch (err) {
            return { success: false, error: err };
        }
    }
    /**
     * getAllowedAndDefaultRoles
     */
    getAllowedAndDefaultRoles() {
        return {
            allowedRoles: [locals_1.default.config().hasuraGraphqlUserRole],
            defaultRole: locals_1.default.config().hasuraGraphqlUserRole,
        };
    }
    /**
     * Password Generator
     */
    passwordGenerator(passwordLength = 16) {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let password = "";
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        return password;
    }
    /**
     * Capitalize First Letter
     */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
exports.default = new Helpers();
//# sourceMappingURL=helpers.js.map