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
const locals_1 = require("../providers/locals");
class Commons {
    constructor() {
        this.axios = require("axios");
    }
    /**
     * Graphql request
     */
    GQLRequest({ variables, query }) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "content-type": "application/json",
                "x-hasura-admin-secret": locals_1.default.config().hasuraAdminSecret,
            };
            return yield this.axios({
                url: `${locals_1.default.config().hasuraGraphqlURL}`,
                method: "POST",
                headers: headers,
                data: {
                    query,
                    variables,
                },
            });
        });
    }
    /**
     * Graphql request
     */
    AuthGQLRequest({ variables, query, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            return yield this.axios({
                url: `${locals_1.default.config().hasuraGraphqlURL}`,
                method: "POST",
                headers: headers,
                data: {
                    query,
                    variables,
                },
            });
        });
    }
    /**
     * Server response
     */
    Response(res, success, message, data) {
        res.json({ success, message, data });
    }
    /**
     * check validation error
     */
    CheckError(error, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error) {
                const { details } = error;
                const message = details.map((i) => i.message).join(",");
                return this.Response(res, false, message, null);
            }
            next();
        });
    }
    /**
     * validate token
     */
    ValidateToken(_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let decoded = jwt.verify(_token.replace("Bearer ", ""), locals_1.default.config().jwtSecret);
                return decoded;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new Commons();
//# sourceMappingURL=commons.js.map